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
}

export default new RecipientController();
