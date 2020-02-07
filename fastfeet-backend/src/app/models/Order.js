import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init({
      product: Sequelize.STRING,
      canceledAt: Sequelize.DATE,
      startDate: Sequelize.DATE,
      endDate: Sequelize.DATE,
    },
    {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipientId' });
    this.belongsTo(models.DeliveryMan, { foreignKey: 'deliverymanId' });
    this.belongsTo(models.File, { foreignKey: 'signatureId' });
  }
}
export default Order;
