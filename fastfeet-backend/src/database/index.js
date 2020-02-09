
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';
import File from '../app/models/File';
import Order from '../app/models/Order';
import OrderProblem from '../app/models/OrderProblem';

const models = [User, Recipient, DeliveryMan, File, Order, OrderProblem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model && model.associate && model.associate(this.connection.models),
      );
  }
}

export default new Database();
