import {
  startOfToday, endOfToday, setSeconds, setMinutes, setHours, isAfter, isBefore, parseISO,
} from 'date-fns';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Order from '../models/Order';


class DeliveryController {
  async update(req, res) {
    const { deliveryManId, orderId } = req.params;
    const { actualDate } = req.body;
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

    const startDate = parseISO(actualDate);

    const beginOfWork = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const endOfWork = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    if (isBefore(startDate, beginOfWork) || isAfter(startDate, endOfWork)) {
      return res.status(401).json({ error: 'We are close for deliveries' });
    }
    const order = await Order.findByPk(orderId);

    if (!order) return res.status(400).json({ error: 'Order not found' });

    order.startDate = startDate;

    const updatedOrder = await order.update();

    return res.json(updatedOrder);
  }
}

export default new DeliveryController();
