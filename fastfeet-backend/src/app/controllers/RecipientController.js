import * as Yup from 'yup';
import Recipient from '../models/Recipient';

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
      return res.status(401).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { recipientId } = req.params;
    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }
    const updatedRecipient = await recipient.update(req.body);

    return res.json(updatedRecipient);
  }

  async delete(req, res) {
    const { recipientId } = req.params;
    const recipient = await Recipient.findByPk(recipientId);
    if (!recipient || recipient === {}) {
      return res.status(401).json({ error: 'Recipient does not exist' });
    }
    await recipient.destroy();

    return res.json({ message: 'Recipient deleted success' });
  }

  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }
}

export default new RecipientController();
