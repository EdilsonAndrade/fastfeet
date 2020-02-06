import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const deliveryMan = await DeliveryMan.create(req.body);
    return res.json(deliveryMan);
  }

  async update(req, res) {
    const { deliveryManId } = req.params;
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);
    if (!deliveryMan) {
      return res.status(401).json({ error: 'DeliveryMan does not exist' });
    }
    const updatedRecipient = await deliveryMan.update(req.body);

    return res.json(updatedRecipient);
  }

  async delete(req, res) {
    const { deliveryManId } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);

    if (!deliveryMan || deliveryMan === {}) {
      return res.status(401).json({ error: 'DeliveryMan does not exist' });
    }
    await deliveryMan.destroy(req.body);

    return res.json({ message: 'DeliveryMan deleted success' });
  }

  async index(req, res) {
    const deliveryMen = await DeliveryMan.findAll();
    return res.json(deliveryMen);
  }
}

export default new DeliveryManController();
