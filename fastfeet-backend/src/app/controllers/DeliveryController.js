import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';

class DeliveryController {
  async update(req, res) {
    const { deliveryManId, orderId } = req.params;
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);

    if (!deliveryMan) return res.status(400).json({ error: 'DeliveryMan does not exist' });

    const order = await Order.findByPk(orderId);

    if (!order) return res.status(400).json({ error: 'Order not found' });

    order.startDate = new Date();
    const updatedOrder = await order.update();

    return res.json(updatedOrder);
  }
}

export default new DeliveryController();
