import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      addressLine: Sequelize.STRING,
      addressLineTwo: Sequelize.STRING,
      state: Sequelize.STRING,
      zipCode: Sequelize.STRING,
      number: Sequelize.STRING,
      city: Sequelize.STRING,

    }, {
      sequelize,
    });
    return this;
  }
}

export default Recipient;
