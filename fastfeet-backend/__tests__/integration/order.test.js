import request from 'supertest';
import { parseISO } from 'date-fns';
import app from '../../src/app';
import factory from '../factories';

describe('Orders', () => {
  let user = '';
  let fakeRecipient;
  let fakeDeliveryMan;
  beforeAll(async () => {
    user = await factory.create('User');

    fakeRecipient = await factory.create('Recipient');
    fakeDeliveryMan = await factory.create('DeliveryMan');
  });


  it('should return not authorized', async () => {
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .post('/orders')
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body.error).toEqual('User not authorized');
  });

  it('should create an order', async () => {
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body).toHaveProperty('id');
  });

  it('DeliveryMan not found', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        product: 'Shirt',
        recipientId: fakeRecipient.id,
      });
    expect(response.body.error).toEqual('Deliveryman not found');
  });

  it('should update an order', async () => {
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const anotherFakeDeliveryMan = await factory.create('DeliveryMan');
    const anotherFakeRecipient = await factory.create('Recipient');
    const updatedResponse = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        recipientId: anotherFakeRecipient.id,
        deliverymanId: anotherFakeDeliveryMan.id,
      });

    const { recipientId, deliverymanId } = updatedResponse.body;
    expect(recipientId).toBe(anotherFakeRecipient.id);
    expect(deliverymanId).toBe(anotherFakeDeliveryMan.id);
  });


  it('Recipient not found', async () => {
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body.error).toEqual('Recipient not found');
  });

  it('should list an order', async () => {
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const response = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ orderId: fakeOrder.id });


    expect(response.body).toHaveProperty('id');
  });

  it('should list all orders', async () => {
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const response = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(response.body.length).toBeGreaterThan(1);
  });

  it('on update DeliveryMan not found', async () => {
    const response = await request(app)
      .put('/orders/1}')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        product: 'Shirt',
        recipientId: fakeRecipient.id,

      });
    expect(response.body.error).toEqual('Deliveryman not found');
  });


  it('on update Recipient not found', async () => {
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body.error).toEqual('Recipient not found');
  });

  it('on update order not found', async () => {
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const anotherFakeDeliveryMan = await factory.create('DeliveryMan');
    const anotherFakeRecipient = await factory.create('Recipient');

    const updatedResponse = await request(app)
      .put('/orders/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        recipientId: anotherFakeRecipient.id,
        deliverymanId: anotherFakeDeliveryMan.id,
      });

    expect(updatedResponse.body.error).toEqual('Order not found');
  });


  it('should delete order', async () => {
    const order = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });


    const { id } = order;

    const deleted = await request(app)
      .delete(`/orders/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body).toHaveProperty('canceledAt');
  });

  it('should delete order not found', async () => {
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const deleted = await request(app)
      .delete('/orders/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.error).toEqual('Order does not exist');
  });

  it('should update order start date', async () => {
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const date = new Date();
    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ recipientId: fakeRecipient.id, deliverymanId: fakeDeliveryMan.id, startDate: date });

    expect(parseISO(response.body.startDate)).toEqual(date);
  });

  it('should update order end date', async () => {
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const date = new Date();
    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ recipientId: fakeRecipient.id, deliverymanId: fakeDeliveryMan.id, endDate: date });

    expect(parseISO(response.body.endDate)).toEqual(date);
  });

  it('should in update order end date not authorize', async () => {
    const fakeOrder = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });
    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .send({ recipientId: fakeRecipient.id, deliverymanId: fakeDeliveryMan.id });

    expect(response.body.error).toEqual('User not authorized');
  });

  it('should list an order searching by product name', async () => {
    const order = await factory.attrs('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
      product: 'Feijoada Completa',
    });
    await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(order);

    const response = await request(app)
      .get('/orders?Compl')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(response.body[response.body.length - 1].product).toBe('Feijoada Completa');
  });
});
