import { resolve } from 'path';
import fs from 'mz/fs';
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';

describe('File Upload', () => {
  it('file should exist', async () => {
    const filePath = resolve(__dirname, '..', 'testfile', 'testefile.png');
    const result = await fs.exists(filePath);
    expect(result).toBeTruthy();
  });

  it('should upload file', async () => {
    const filePath = resolve(__dirname, '..', 'testfile', 'testefile.png');
    const uploadPath = resolve(__dirname, '..', '..', 'tmp', 'uploads');
    const fakeDeliveryMan = await factory.create('DeliveryMan');
    const { id } = fakeDeliveryMan;
    const user = await factory.create('User');
    const response = await request(app)
      .post(`/files/${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .field('name', 'file')
      .attach('file', filePath);
    await fs.unlink(resolve(uploadPath, response.body.path));

    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('path');
  });
});
