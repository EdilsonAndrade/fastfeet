import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';

class FileUploadController {
  async store(req, res) {
    const { deliveryManId } = req.params;

    const { originalname: name, filename: path } = req.file;
    const user = await DeliveryMan.findByPk(deliveryManId);
    if (!user) {
      return res.status(400).json({ error: 'DeliveryMan not found' });
    }
    const file = await File.create({
      name,
      path,
    });

    await user.update({
      avatar_id: file.id,
    });

    return res.json(file);
  }
}

export default new FileUploadController();
