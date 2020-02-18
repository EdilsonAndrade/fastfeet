import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

describe('Order Problems', () => {
  let user = '';
  let fakeRecipient;
  let fakeDeliveryMan;
  let fakeOrder;
  beforeAll(async () => {
    user = await factory.create('User');

    fakeRecipient = await factory.create('Recipient');
    fakeDeliveryMan = await factory.create('DeliveryMan');
    fakeOrder = await factory.create('Order', {
      deliverymanId: fakeDeliveryMan.id,
      recipientId: fakeRecipient.id,
    });
  });

  it('should list all order problems', async () => {
    await factory.create('OrderProblem', {
      orderId: fakeOrder.id,
    });

    const response = await request(app)
      .get(`/orders/${fakeOrder.id}/problems`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should save a problem and return description', async () => {
    const fakeOrderProblem = await factory.attrs('OrderProblem', {
      orderId: fakeOrder.id,
    });

    const response = await request(app)
      .post(`/orders/${fakeOrder.id}/problems`)
      .send({ description: fakeOrderProblem.description });
    expect(response.body.description).toEqual(fakeOrderProblem.description);
  });
});
