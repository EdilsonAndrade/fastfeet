import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';

class FileUploadController {
  async update(req, res) {
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

  async store(req, res) {
    const { deliveryManId } = req.query;

    const { originalname: name, filename: path } = req.file;
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);


    if (!name) {
      return res.status(401).json({ error: 'An imagem must be send' });
    }
    const file = await File.create({
      name,
      path,
    });

    if (deliveryMan) {
      await deliveryMan.update({
        avatar_id: file.id,
      });
    }


    return res.json(file);
  }
}

export default new FileUploadController();
