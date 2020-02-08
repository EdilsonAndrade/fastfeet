import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

beforeAll(async () => {
  await truncate();
});

describe('DeliveryMan', () => {
  it('should return not authorized', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');

    const response = await request(app)
      .post('/deliveryman')
      .send(fakeDeliveryMan);
    expect(response.body.error).toEqual('User not authorized');
  });

  it('should create deliveryman ', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');
    const user = await factory.create('User');
    const response = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(fakeDeliveryMan);

    expect(response.body).toHaveProperty('id');
  });

  it('should return validation failed if missed not nullable field', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');
    const user = await factory.create('User');
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
    const user = await factory.create('User');
    const updatedDeliveryMan = await factory.attrs('DeliveryMan');


    const updateDeliveryMan = await request(app)
      .put(`/deliveryman/${fakeDeliveryMan.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(updatedDeliveryMan);

    const { name } = updateDeliveryMan.body;

    expect(name).toEqual(updatedDeliveryMan.name);
  });

  it('should error deliveryman does not exist', async () => {
    const user = await factory.create('User');
    const updatedDeliveryMan = await request(app)
      .put('/deliveryman/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name: 'Edilson DeliveryMan' });

    expect(updatedDeliveryMan.body.error).toEqual('DeliveryMan does not exist');
  });
  it('should delete deliveryman', async () => {
    const deliveryman = await factory.create('DeliveryMan');
    const user = await factory.create('User');

    const { id } = deliveryman;

    const deleted = await request(app)
      .delete(`/deliveryman/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toEqual('DeliveryMan deleted success');
  });

  it('should delete deliveryman not found', async () => {
    const deliveryman = await factory.attrs('DeliveryMan');
    const user = await factory.create('User');


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
    const user = await factory.create('User');


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
      .get('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deliveryman.body.length).toBeGreaterThan(1);
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
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/${fakeOrder.id}/delivery`);

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
      .put(`/deliveryman/15000/orders/${fakeOrder.id}/delivery`);

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
      .put(`/deliveryman/${fakeDeliveryMan.id}/orders/2500/delivery`);

    expect(updatedResponse.body.error).toBe('Order not found');
  });

  // it('deliveryman can get only 5 orders by day should return limit order exceed', async () => {

  // });
});
