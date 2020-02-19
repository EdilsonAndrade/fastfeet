
import { Op } from 'sequelize';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
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
    const { search, limit, page } = req.query;

    if (!deliveryManId && search) {
      const orders = await Order.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        where: {
          product: {
            [Op.like]: `%${search}%`,
          },
        },
        include: [
          {
            model: Recipient,
            attributes: ['name', 'city', 'state'],
          },
          {
            model: DeliveryMan,
            attributes: ['name'],
          },
        ],
      });
      return res.json(orders);
    }

    if (!deliveryManId) {
      const orders = await Order.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        include: [
          {
            model: Recipient,
            attributes: ['name', 'city', 'state'],
          },
          {
            model: DeliveryMan,
            attributes: ['name'],
          },
        ],
      });
      return res.json(orders);
    }

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
    const updatedOrder = await order.update({
      canceledAt: new Date(),
    });

    return res.json(updatedOrder);
  }
}

export default new OrderController();
