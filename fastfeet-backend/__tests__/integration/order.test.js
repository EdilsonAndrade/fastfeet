import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('Orders', () => {
  beforeEach(async () => {
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
    const fakeOrder = await factory.attrs('Order');
    const fakeRecipient = await factory.create('Recipient');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const user = await factory.create('User');

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

  it('should update an order', async () => {
    const fakeRecipient = await factory.create('Recipient');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const fakeOrder = await factory.attrs('Order',
      {
        recipientId: fakeRecipient.id,
        deliverymanId: fakeDeliveryMan.id,
      });
    const user = await factory.create('User');
    const response = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        ...fakeOrder,
        recipientId: fakeRecipient.id,
        deliverymanId: fakeDeliveryMan.id,
      });
    expect(response.body).toHaveProperty('id');


    const anotherFakeRecipient = await factory.create('Recipient');
    const anotherFakeDeliveryMan = await factory.create('DeliveryMan');

    const updatedResponse = await request(app)
      .put(`/orders/${response.body.id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({
        recipientId: anotherFakeRecipient.id,
        deliverymanId: anotherFakeDeliveryMan.id,
      });


    expect(updatedResponse.body).toHaveProperty('recipientId');
  });
});
