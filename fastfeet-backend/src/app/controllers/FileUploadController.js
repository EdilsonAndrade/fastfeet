import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';


class FileUploadController {
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
