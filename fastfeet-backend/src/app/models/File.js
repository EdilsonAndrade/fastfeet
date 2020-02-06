import { Model, Sequelize } from 'sequelize';

class File extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${encodeURI(this.path)}`;
          },
        },
      },
      {
        sequelize: connection,
      },
    );
  }
}

export default File;
