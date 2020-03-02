import {
  startOfToday, endOfToday, setSeconds, setMinutes, setHours, isAfter, isBefore, parseISO,
} from 'date-fns';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

class DeliveryManagementController {
  async update(req, res) {
    const { deliveryManId, orderId } = req.params;
    const { startDate, endDate } = req.body;
    const deliveryMan = await DeliveryMan.findByPk(deliveryManId);

    if (!deliveryMan) return res.status(400).json({ error: 'DeliveryMan does not exist' });


    const countOfOrderDelivered = await Order.findAll({
      where: {
        startDate: {
          [Op.between]: [startOfToday(), endOfToday()],
        },
        deliverymanId: deliveryManId,

      },

    });
    if (countOfOrderDelivered.length === 5) {
      return res.status(401).json({ error: 'Limit of 5 orders exceeded' });
    }

    const actualDate = parseISO(startDate);

    const beginOfWork = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const endOfWork = setSeconds(setMinutes(setHours(new Date(), 23), 0), 0);

    if (isBefore(actualDate, beginOfWork) || isAfter(actualDate, endOfWork)) {
      return res.status(401).json({ error: 'Estamos fechados para retirada' });
    }
    const order = await Order.findByPk(orderId);

    if (!order) return res.status(400).json({ error: 'Pedido não encontrado' });

    if (endDate) {
      if (!order.signatureId) {
        return res.status(401).json({ error: 'Assinatura deve ser enviada' });
      }
    }
    await order.update({
      startDate,
      endDate,
    });
    const updatedOrder = await Order.findByPk(orderId, {
      include: [
        {
          model: Recipient,
          attributes: ['id', 'name', 'city', 'state', 'addressLine', 'addressLineTwo', 'number', 'zipCode'],
        },
        {
          model: DeliveryMan,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(updatedOrder);
  }
}

export default new DeliveryManagementController();
