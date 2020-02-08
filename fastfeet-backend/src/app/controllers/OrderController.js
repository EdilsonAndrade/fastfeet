
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';

class OrderController {
  async store(req, res) {
    const { deliverymanId, recipientId, product } = req.body;

    const deliveryMan = await DeliveryMan.findByPk(deliverymanId);
    if (!deliveryMan) return res.status(400).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) return res.status(400).json({ error: 'Recipient not found' });

    const response = await Order.create({
      product,
      recipientId,
      deliverymanId,
    });

    return res.json(response);
  }

  async index(req, res) {
    const { orderId } = req.body;
    const { deliveryManId } = req.params;

    if (deliveryManId) {
      const myOrders = await Order.findAll({
        where: {
          canceledAt: null,
          endDate: null,
          deliverymanId: deliveryManId,
        },
        include: [
          {
            model: DeliveryMan,
            attributes: ['id', 'email', 'name'],
          },
          {
            model: Recipient,
          },
        ],
      });
      return res.json(myOrders);
    }

    if (orderId) {
      const order = await Order.findByPk(orderId);
      return res.json(order);
    }

    const orders = await Order.findAll();
    return res.json(orders);
  }

  async update(req, res) {
    const {
      deliverymanId, recipientId, product, endDate,
    } = req.body;
    const { orderId } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(deliverymanId);
    if (!deliveryMan) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }
    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient) return res.status(400).json({ error: 'Recipient not found' });

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(400).json({ error: 'Order not found' });

    const updatedOrder = await order.update({
      deliverymanId,
      product,
      recipientId,
      endDate,
    });
    return res.json(updatedOrder);
  }

  async delete(req, res) {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    await order.destroy();

    return res.json({ message: 'Order deleted success' });
  }
}

export default new OrderController();
