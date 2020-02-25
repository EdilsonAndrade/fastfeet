import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

beforeEach(async () => {
  await truncate();
});
describe('User', () => {
  afterAll(async () => {
    await truncate();
  });
  let body = '';
  beforeEach(async () => {
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

  it('user does not exist when loggin', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'invalido@fastfeet.com', password: '123456' });
    expect(response.body.error).toEqual('User does not exist');
  });

  it('should return password invalid', async () => {
    await factory.create('User', {
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({ email: 'admin@fastfeet.com', password: '1234567' });
    expect(response.body.error).toBe('User or Password is invalid');
  });
  it('user must be created', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Distribuidora FastFeet',
        email: 'admin@fastfeet.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
  it('should return validation failed', async () => {
    const response = await request(app).post('/sessions').send();

    expect(response.body.error).toBe('Validation failed');
  });

  it('access token must exist', async () => {
    expect(body).toHaveProperty('token');
  });
});
