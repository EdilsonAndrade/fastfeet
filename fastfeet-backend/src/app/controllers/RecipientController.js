import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      addressLine: Yup.string().required(),
      state: Yup.string().required(),
      zipCode: Yup.string().required(),
      number: Yup.string().required(),
      city: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { recipientId } = req.params;
    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist' });
    }
    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }

  async delete(req, res) {
    const { recipientId } = req.params;
    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient) {
      return res.status(400).json({ error: 'Client does not exist' });
    }
    const order = await Order.findOne({ where: { recipientId } });
    if (order) {
      return res.status(400).json({ error: 'Client has an product associated, cant be deleted' });
    }

    await recipient.destroy();


    return res.json({ message: 'Recipient deleted success' });
  }

  async index(req, res) {
    const { search, limit, page } = req.query;
    if (search) {
      const recipients = await Recipient.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search.toString().toLowerCase()}%`,
              },
            },
            {
              name: {
                [Op.iLike]: `%${search.toString().toUpperCase()}%`,
              },
            },
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },

          ],

        },
      });
      return res.json(recipients);
    }
    if (limit && page) {
      const recipients = await Recipient.findAndCountAll({
        limit: Number(limit),
        offset: (page - 1) * limit,
      });
      return res.json(recipients);
    }

    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }
}

export default new RecipientController();
