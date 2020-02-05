import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });
  let body = '';
  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '123456' });
    body = response.body;
  });


  it('should return not authorize for create', async () => {
    const recipient = await factory.attrs('Recipient');

    const response = await request(app)
      .post('/recipients', recipient);

    const { message } = response.body;

    expect(message).toBe('User not authorized');
  });

  it('should create recipient ', async () => {
    const recipient = await factory.attrs('Recipient');

    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `bearer ${body.token}`)
      .send(recipient);


    expect(response.body).toHaveProperty('id');
  });

  it('should return validation failed if missed not nullable field', async () => {
    const recipient = await factory.create('Recipient', {
      number: '1234',
    });
    const { name } = recipient;
    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `bearer ${body.token}`)
      .send({ name });
    const { error } = response.body;
    console.log('cheguei aqu');
    expect(error).toBe('Validation failed');
  });
});
