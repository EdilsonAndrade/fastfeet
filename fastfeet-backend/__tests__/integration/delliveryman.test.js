import request from 'supertest';
import { setHours, parseISO } from 'date-fns';
import fs from 'mz/fs';
import { resolve } from 'path';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('DeliveryMan', () => {
  let user;
  beforeAll(async () => {
    await truncate();
    user = await factory.create('User');
  });

  afterAll(async () => {
    await truncate();
  });

  it('should return not authorized', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');

    const response = await request(app)
      .post('/deliveryman')
      .send(fakeDeliveryMan);
    expect(response.body.error).toEqual('User not authorized');
  });

  it('should create deliveryman ', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');

    const response = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryMan);

    expect(response.body).toHaveProperty('id');
  });

  it('should return validation failed if missed not nullable field', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');

    const { name } = fakeDeliveryMan;
    const response = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name });

    const { error } = response.body;

    expect(error).toEqual('Validation failed');
  });

  it('should update deliveryman', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');

    const updatedDeliveryMan = await factory.attrs('DeliveryMan');


    const updateDeliveryMan = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(updatedDeliveryMan);

    const { name } = updateDeliveryMan.body;

    expect(name).toEqual(updatedDeliveryMan.name);
  });

  it('should error deliveryman does not exist', async () => {
    const updatedDeliveryMan = await request(app)
      .put('/deliveryman/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name: 'Edilson DeliveryMan' });

    expect(updatedDeliveryMan.body.error).toEqual('DeliveryMan does not exist');
  });
  it('should delete deliveryman', async () => {
    const deliveryman = await factory.create('DeliveryMan');


    const { id } = deliveryman;

    const deleted = await request(app)
      .delete(`/deliveryman/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toEqual('DeliveryMan deleted success');
  });

  it('should delete deliveryman not found', async () => {
    const deliveryman = await factory.attrs('DeliveryMan');


    await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(deliveryman);

    const deleted = await request(app)
      .delete('/deliveryman/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.error).toEqual('DeliveryMan does not exist');
  });

  it('should list deliveryman', async () => {
    let fakeDeliveryman = await factory.attrs('DeliveryMan');


    await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryman);

    fakeDeliveryman = await factory.attrs('DeliveryMan');

    await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryman);

    const deliveryman = await request(app)
      .get('/deliveryman?limit=10&page=1')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deliveryman.body.rows.length).toBeGreaterThan(1);
  });

  it('should list not canceled and not delivered orders ', async () => {
    const deliveryMan = await factory.create('DeliveryMan');
    let recipient = await factory.create('Recipient');


    await factory.create('Order', {
      recipientId: recipient.id,
      deliverymanId: deliveryMan.id,
    });
    recipient = await factory.create('Recipient');
    await factory.create('Order', {
      recipientId: recipient.id,
      deliverymanId: deliveryMan.id,
    });

    const myOrders = await request(app)
      .get(`/deliveryman/${deliveryMan.id}/orders`);


    expect(myOrders.body.length).toBeGreaterThan(1);
  });

  it('when delivery man get order, update start date', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');

    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}`);

    expect(updatedResponse.body.startDate).toBeDefined();
  });

  it('when delivery man get order, deliveryMan not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');

    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const updatedResponse = await request(app)
      .put(`/deliveryman/15000/orders/${fakeOrder.id}`);

    expect(updatedResponse.body.error).toBe('DeliveryMan does not exist');
  });

  it('when delivery man get order, order not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');

    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/2500`);

    expect(updatedResponse.body.error).toBe('Order not found');
  });

  it('deliveryman can get only 5 orders by day should return limit order exceed', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');

    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      startDate: new Date(),
    });

    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      startDate: new Date(),
    });
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      startDate: new Date(),
    });
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      startDate: new Date(),
    });
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      startDate: new Date(),
    });
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}`)
      .send({ actualDate: setHours(new Date(), 19) });

    expect(updatedResponse.body.error).toBe('Limit of 5 orders exceeded');
  });

  it('deliveryman can get package between 8am and 6pm', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');


    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}`)
      .send({ actualDate: setHours(new Date(), 19) });

    expect(updatedResponse.body.error).toBe('We are close for deliveries');
  });

  it('end delivery without signature must raise error', async () => {
    const fakeRecipient = await factory.create('Recipient');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const endDate = new Date();
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}`)
      .send({ endDate });

    expect(updatedResponse.body.error).toEqual('Signature must be send');
  });

  it('end delivery', async () => {
    const fakeRecipient = await factory.create('Recipient');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const filePath = resolve(__dirname, '..', 'testfile', 'testefile.png');
    const uploadPath = resolve(__dirname, '..', '..', 'tmp', 'uploads');

    const response = await request(app)
      .put(`/files/${fakeOrder.id}`)
      .field('name', 'file')
      .attach('file', filePath);

    await fs.unlink(resolve(uploadPath, response.body.File.path));

    expect(response.body.signatureId).toBeDefined();

    const endDate = new Date();
    const updatedResponse = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}`)
      .send({ endDate });
    expect(parseISO(updatedResponse.body.endDate)).toEqual(endDate);
  });

  it('should list deliveryman by name', async () => {
    let fakeDeliveryman = await factory.attrs('DeliveryMan', {
      name: 'Edilson Andrade',
    });


    await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryman);

    fakeDeliveryman = await factory.attrs('DeliveryMan');

    await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryman);

    const deliveryman = await request(app)
      .get('/deliveryman?search=Andra&limit=10&page=1')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deliveryman.body.rows[0].name).toBe('Edilson Andrade');
  });
});
