import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';

class FileUploadController {
  async store(req, res) {
    const { deliveryManId } = req.body;
    const { originalname: name, filename: path } = req.file;
    const user = await DeliveryMan.findByPk(deliveryManId);
    if (!user) {
      return res.status(401).json({ error: 'Delivery man not found' });
    }
    const file = await File.create({
      name,
      path,
    });

    if (!file) {
      return res.status(401).json('Error occuried while uploading the file');
    }
    await user.update({
      avatar_id: file.id,
    });

    return res.json(file);
  }
}

export default new FileUploadController();
