import path, { resolve } from 'path';
import fs from 'mz/fs';
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../utils/truncate';

describe('File Upload', () => {
  afterAll(async () => {
    await truncate();
  });
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
      .post(`/files?deliveryManId=${id}`)
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .field('name', 'file')
      .attach('file', filePath);
    await fs.unlink(resolve(uploadPath, response.body.path));

    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('path');
  });

  it('uploading file returns url, path and id to save further', async () => {
    const filePath = resolve(__dirname, '..', 'testfile', 'testefile.png');
    const user = await factory.create('User');
    const response = await request(app)
      .post('/files?deliveryManId=0')
      .set('Authorization', `Bearer ${user.generateToken().token}`)
      .field('name', 'file')
      .attach('file', filePath);

    const directory = resolve(__dirname, '..', '..', 'tmp', 'uploads');
    fs.readdir(directory, (err, files) => {
      files.forEach((file) => {
        fs.unlink(path.join(directory, file));
      });
    });
    expect(response.body).toHaveProperty('url');
    expect(response.body).toHaveProperty('path');
    expect(response.body).toHaveProperty('id');
  });
});
