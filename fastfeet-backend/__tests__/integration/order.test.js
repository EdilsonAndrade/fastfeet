import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('Orders', () => {
  let user = '';
  beforeAll(async () => {
    user = await factory.create('User');
    await truncate();
  });


  it('should return not authorized', async () => {
    const fakeOrder = await factory.attrs('Order');
    const fakeRecipient = await factory.create('Recipient');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
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
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
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

  it('should upadte an order', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
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

  it('DeliveryMan not found', async () => {
    const fakeRecipient = await factory.create('Recipient');
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: 1,
      });
    expect(response.body.error).toEqual('Deliveryman not found');
  });

  it('Recipient not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: 22,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body.error).toEqual('Recipient not found');
  });

  it('should list an order', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
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
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
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
    const fakeRecipient = await factory.create('Recipient');
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: 1,
      });
    expect(response.body.error).toEqual('Deliveryman not found');
  });

  it('on update DeliveryMannot found not found', async () => {
    const fakeRecipient = await factory.create('DeliveryMan');
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: 33,
      });
    expect(response.body.error).toEqual('Deliveryman not found');
  });

  it('on update Recipient not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeOrder = await factory.attrs('Order');

    const response = await request(app)
      .put(`/orders/${fakeOrder.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: 22,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body.error).toEqual('Recipient not found');
  });

  it('on update order not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
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
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
    const order = await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });


    const { id } = order;

    const deleted = await request(app)
      .delete(`/orders/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toEqual('Order deleted success');
  });

  it('should delete order not found', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeRecipient = await factory.create('Recipient');
    await factory.create('Order', {
      recipientId: fakeRecipient.id,
      deliverymanId: fakeDeliveryMan.id,
    });

    const deleted = await request(app)
      .delete('/orders/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.error).toEqual('Order does not exist');
  });
});
