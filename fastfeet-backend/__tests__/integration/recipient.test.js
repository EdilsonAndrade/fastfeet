import request from 'supertest';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

beforeEach(async () => {
  await truncate();
});
describe('Recipient', () => {
  afterAll(async () => {
    await truncate();
  });
  it('should return not authorize for create', async () => {
    const recipient = await factory.attrs('Recipient');

    const response = await request(app)
      .post('/recipients', recipient);

    const { error } = response.body;

    expect(error).toEqual('User not authorized');
  });

  it('should create recipient ', async () => {
    const recipient = await factory.attrs('Recipient');
    const user = await factory.create('User');


    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    expect(response.body).toHaveProperty('id');
  });

  it('should return validation failed if missed not nullable field', async () => {
    const recipient = await factory.create('Recipient', {
      number: '1234',
    });
    const user = await factory.create('User');
    const { name } = recipient;

    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name });

    const { error } = response.body;

    expect(error).toEqual('Validation failed');
  });

  it('should update recipient', async () => {
    const recipient = await factory.attrs('Recipient');
    const user = await factory.create('User');
    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    const { id } = response.body;
    const updatedRecipient = await request(app)
      .put(`/recipients/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name: 'Edilson Recipient' });

    const { name } = updatedRecipient.body;

    expect(name).toEqual('Edilson Recipient');
  });

  it('should error recipient does not exist', async () => {
    const user = await factory.create('User');
    const updatedRecipient = await request(app)
      .put('/recipients/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send({ name: 'Edilson Recipient' });

    expect(updatedRecipient.body.error).toEqual('Recipient does not exist');
  });

  it('should delete recipient', async () => {
    const recipient = await factory.create('Recipient');
    const user = await factory.create('User');

    const { id } = recipient;
    const deleted = await request(app)
      .delete(`/recipients/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(deleted.body.message).toEqual('Recipient deleted success');
  });

  it('should delete recipient', async () => {
    await factory.create('Recipient');
    const user = await factory.create('User');

    const deleted = await request(app)
      .delete('/recipients/0')
      .set('Authorization', `Bearer ${user.generateToken().token}`);
    expect(deleted.body.error).toEqual('Recipient does not exist');
  });

  it('should list recipients', async () => {
    let recipient = await factory.attrs('Recipient');
    const user = await factory.create('User');
    await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    recipient = await factory.attrs('Recipient');

    await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    const recipients = await request(app)
      .get('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`);

    expect(recipients.body).toHaveLength(2);
  });

  it('should list recipients by name', async () => {
    let recipient = await factory.attrs('Recipient', {
      name: 'Marcelo Oliveira',
    });
    const user = await factory.create('User');
    await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    recipient = await factory.attrs('Recipient', {
      name: 'André cola',
    });

    await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .send(recipient);

    const recipients = await request(app)
      .get('/recipients?search=Oli&limit=10&page=1')
      .set('Authorization', `Bearer ${user.generateToken().token}`);
    expect(recipients.body.rows[0].name).toBe('Marcelo Oliveira');
  });
});
