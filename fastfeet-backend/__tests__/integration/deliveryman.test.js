import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';


describe('DeliveryMan', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return not authorized', async () => {
    const fakeDeliveryMan = await factory.attrs('DeliveryMan');

    const response = await request(app)
      .post('/deliveryman')
      .send(fakeDeliveryMan);
    expect(response.body.error).toBe('User not authorized');
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

    expect(error).toBe('Validation failed');
  });

  it('should update deliveryman', async () => {
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const user = await factory.create('User');
    const updatedDeliveryMan = await factory.attrs('DeliveryMan');

    const { id } = fakeDeliveryMan;

    const updateDeliveryMan = await request(app)
      .put(`/deliveryman/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(updatedDeliveryMan);

    const { name } = updateDeliveryMan.body;

    expect(name).toEqual(updatedDeliveryMan.name);
  });

  // novos

  it('should error deliveryman does not exist', async () => {
    const user = await factory.create('User');
    const updatedDeliveryMan = await request(app)
      .put('/deliveryman/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name: 'Edilson DeliveryMan' });

    expect(updatedDeliveryMan.body.error).toBe('DeliveryMan does not exist');
  });

  it('should delete deliveryman', async () => {
    const deliveryman = await factory.attrs('DeliveryMan');
    const user = await factory.create('User');


    const response = await request(app)
      .post('/deliveryman')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(deliveryman);

    const { id } = response.body;

    const deleted = await request(app)
      .delete(`/deliveryman/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toBe('DeliveryMan deleted success');
  });

  it('should delete deliveryman not found', async () => {
    const user = await factory.create('User');

    const deleted = await request(app)
      .delete('/deliveryman/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toBe('DeliveryMan does not exist');
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

    expect(deliveryman.body).toHaveLength(2);
  });
});
