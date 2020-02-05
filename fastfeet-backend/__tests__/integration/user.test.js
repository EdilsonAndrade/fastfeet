import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';

describe('User', () => {
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
  beforeEach(async () => {
    await truncate();
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
