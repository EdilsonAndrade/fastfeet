import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';
import OrderProblem from '../models/OrderProblem';

class OrderProblemController {
  async index(req, res) {
    const { orderId } = req.params;
    const orderProblem = await OrderProblem.findAll({
      where: { orderId },
      include: [
        {
          model: Order,
          attributes: ['id', 'product', 'startDate', 'endDate'],
          include: [
            {
              model: DeliveryMan,
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });
    if (!orderProblem) {
      return res.status(401).json({ error: 'Order not found' });
    }
    return res.json(orderProblem);
  }

  async store(req, res) {
    const { orderId } = req.params;
    const { description } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(401).json({ error: 'Order not found' });
    }

    const orderProblem = await OrderProblem.create({
      description,
      orderId,
    });

    return res.json(orderProblem);
  }
}

export default new OrderProblemController();
