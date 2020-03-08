import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';
import Order from '../models/Order';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);
    return res.json(deliveryMan);
  }

  async update(req, res) {
    const { deliveryManId } = req.params;
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);
    if (!deliveryMan) {
      return res.status(400).json({ error: 'DeliveryMan does not exist' });
    }
    const updatedRecipient = await deliveryMan.update(req.body);

    return res.json(updatedRecipient);
  }

  async delete(req, res) {
    const { deliveryManId } = req.params;

    const order = await Order.findOne({ where: { deliverymanId: deliveryManId } });
    if (order) {
      return res.status(401).json({ error: 'Delivery man cant be deleted, associated to an order' });
    }
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);
    if (!deliveryMan) {
      return res.status(400).json({ error: 'DeliveryMan does not exist' });
    }

    await deliveryMan.destroy();

    return res.json({ message: 'DeliveryMan deleted success' });
  }

  async index(req, res) {
    const { search, limit, page } = req.query;
    const { deliveryManId } = req.params;

    if (deliveryManId) {
      const deliveryMan = await DeliveryMan.findByPk(deliveryManId, {
        order: [
          ['createdAt', 'ASC'],
        ],
        include: [
          {
            model: File,
            as: 'avatar',
          },

        ],
      });
      return res.json(deliveryMan);
    }

    if (search) {
      const deliveryMen = await DeliveryMan.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        order: [
          ['createdAt', 'ASC'],
        ],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search.toString().toLowerCase()}%`,
              },
            },
            {
              name: {
                [Op.like]: `%${search.toString().toUpperCase()}%`,
              },
            },

          ],

        },
        include: [
          {
            model: File,
            as: 'avatar',
          },
        ],
      });

      return res.json(deliveryMen);
    }
    if (page && limit) {
      const deliveryMen = await DeliveryMan.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        order: [
          ['createdAt', 'ASC'],
        ],
        include: [
          {
            model: File,
            as: 'avatar',
          },
        ],
      });

      return res.json(deliveryMen);
    }

    const deliveryMen = await DeliveryMan.findAll();
    return res.json(deliveryMen);
  }
}

export default new DeliveryManController();
