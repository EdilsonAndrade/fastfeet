import Sequelize, { Model } from 'sequelize';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      password: Sequelize.VIRTUAL,

    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });
    this.addHook('beforeUpdate', async (user) => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });


    return this;
  }

  generateToken() {
    return {
      token: jwt.sign({}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    };
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}
export default User;
