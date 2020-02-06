
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';

const models = [User, Recipient, DeliveryMan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // cria a conexão com a base de dados
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model && model.associate && model.associate(this.connection.models),
      );
  }
}

export default new Database();
