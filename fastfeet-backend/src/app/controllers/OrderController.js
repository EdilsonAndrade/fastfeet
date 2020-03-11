
import { Op } from 'sequelize';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';
import DeliveryCreatedMail from '../jobs/DeliveryCreatedMail';
import DeliveryCanceledMail from '../jobs/DeliveryCanceledMail';
import Queue from '../../lib/Queue';


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
    Queue.add(DeliveryCreatedMail.key, {
      message: {
        to: deliveryMan.email,
        subject: 'Nova entrega cadastrada',
        template: 'newPackage',
        context: {
          deliveryMan: deliveryMan.name,
          startTime: '08:00',
          endTime: '18:00',
        },
      },
    });

    return res.json(response);
  }

  async index(req, res) {
    const { orderId } = req.body;
    const { deliveryManId } = req.params;
    const {
      search, limit, page, done,
    } = req.query;

    if (!deliveryManId && search) {
      const orders = await Order.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        order: [
          ['createdAt', 'ASC'],
        ],
        where: {
          [Op.or]: [
            {
              product: {
                [Op.like]: `%${search.toString().toLowerCase()}%`,
              },
            },
            {
              product: {
                [Op.like]: `%${search.toString().toUpperCase()}%`,
              },
            },

          ],

        },
        include: [
          {
            model: Recipient,

          },
          {
            model: DeliveryMan,
            attributes: ['id', 'name'],
          },
          {
            model: File,
          },
        ],
      });
      return res.json(orders);
    }

    if (!deliveryManId && !orderId) {
      const orders = await Order.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        order: [
          ['createdAt', 'ASC'],
        ],
        include: [
          {
            model: Recipient,

          },
          {
            model: DeliveryMan,
            attributes: ['id', 'name'],
          },
          {
            model: File,
          },
        ],
      });
      return res.json(orders);
    }

    if (deliveryManId) {
      if (!done) {
        const myOrders = await Order.findAndCountAll({
          limit: Number(limit),
          offset: (page - 1) * limit,
          order: [
            ['createdAt', 'ASC'],
          ],
          where: {
            deliverymanId: deliveryManId,
            [Op.or]: [
              {
                canceledAt: null,
                endDate: null,
              },
              {
                startDate: { [Op.not]: null },
                canceledAt: { [Op.not]: null },
                endDate: null,
              },
            ],

          },
          include: [
            {
              model: DeliveryMan,
              attributes: ['id', 'email', 'name'],
            },
            {
              model: Recipient,
            },
            {
              model: File,
            },
          ],
        });
        return res.json(myOrders);
      }
      const myOrders = await Order.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        order: [
          ['createdAt', 'ASC'],
        ],
        where: {
          endDate: { [Op.not]: null },
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
          {
            model: File,
          },
        ],
      });
      return res.json(myOrders);
    }

    const order = await Order.findByPk(orderId);
    return res.json(order);
  }

  async update(req, res) {
    const {
      deliverymanId, recipientId, product, endDate, startDate,
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
      startDate,
    });
    return res.json(updatedOrder);
  }

  async delete(req, res) {
    const { orderId } = req.params;
    const order = await Order.findByPk(orderId, {
      include: [{
        model: DeliveryMan,
        attributes: ['name', 'email'],
      }],
    });
    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }
    const { name, email } = order.DeliveryMan;
    if (name && email) {
      Queue.add(DeliveryCanceledMail.key, {
        message: {
          to: email,
          subject: `Entrega cancelada - ${orderId}`,
          template: 'canceledPackage',

          context: {
            deliveryMan: name,
            orderId,
          },
        },
      });
    }
    await order.destroy();

    return res.json({ message: 'Order deleted' });
  }
}

export default new OrderController();
