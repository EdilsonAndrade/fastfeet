import faker from 'faker';
import { factory } from 'factory-girl';

import Recipient from '../src/app/models/Recipient';

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  addressLine: faker.address.streetAddress(),
  addressLineTwo: faker.address.secondaryAddress(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  number: faker.random.number(),
  city: faker.address.city(),

});

export default factory;
