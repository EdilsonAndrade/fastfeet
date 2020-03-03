import File from '../models/File';
import Order from '../models/Order';

class DeliveryFinishController {
  async store(req, res) {
    const { orderId } = req.params;

    const { originalname: name, filename: path } = req.file;
    if (!name) {
      return res.status(401).json({ error: 'An imagem must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(401).json({ error: 'Order not found' });
    }

    await order.update({
      signatureId: file.id,
      endDate: new Date(),
    });

    const updatedOrder = await Order.findByPk(orderId, {
      include: [
        {
          model: File,
          attributes: ['path', 'name'],
        },
      ],
    });
    return res.json(updatedOrder);
  }
}
export default new DeliveryFinishController();
