import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';


class OrderController {
  async store(req, res) {
    const { deliverymanId, recipientId } = req.body;

    const deliveryMan = await DeliveryMan.findByPk(deliverymanId);
    if (!deliveryMan) return res.status(400).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) return res.status(400).json({ error: 'Recipient not found' });

    try {
      const response = await Order.create({
        product: req.body.product,
        recipientId,
        deliverymanId,
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async index(req, res) {
    const { orderId } = req.params;

    if (orderId) {
      const order = await Order.findByPk(orderId);
      return res.json(order);
    }

    const orders = await Order.findAll();
    return res.json(orders);
  }

  async update(req, res) {
    const { deliverymanId, recipientId, product } = req.body;
    const { orderId } = req.params;


    const deliveryMan = await DeliveryMan.findByPk(deliverymanId);
    if (!deliveryMan) return res.status(400).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient) return res.status(400).json({ error: 'Recipient not found' });

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(400).json({ error: 'Order not found' });


    try {
      const updatedOrder = await order.update({
        deliveryman_id: deliverymanId,
        product,
        recipiente_id: recipientId,
      });
      return res.json(updatedOrder);
    } catch (error) {
      console.log(`erro = ${JSON.stringify(error)}`);
      return res.status(400).json({ error });
    }
  }
}

export default new OrderController();
