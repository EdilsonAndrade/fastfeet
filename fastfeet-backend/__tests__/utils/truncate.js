
import database from '../../src/database';

export default function trucante() {
  return Promise.all(
    Object.keys(database.connection.models).map((key) => database.connection.models[key].destroy({
      truncate: true,
      force: true,
    })),
  );
}
