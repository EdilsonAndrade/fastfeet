import faker from 'faker';
import { factory } from 'factory-girl';

import Recipient from '../src/app/models/Recipient';
import User from '../src/app/models/User';
import DeliveryMan from '../src/app/models/DeliveryMan';
import Order from '../src/app/models/Order';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Order', Order, {
  product: faker.commerce.product(),

});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  addressLine: faker.address.streetAddress(),
  addressLineTwo: faker.address.secondaryAddress(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  number: faker.random.number(),
  city: faker.address.city(),

});

factory.define('DeliveryMan', DeliveryMan, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

export default factory;
