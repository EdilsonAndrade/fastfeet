import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';

class FileUploadController {
  async store(req, res) {
    const { deliveryManId } = req.params;

    const { originalname: name, filename: path } = req.file;
    const user = await DeliveryMan.findByPk(deliveryManId);
    if (!user) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }
    try {
      const file = await File.create({
        name,
        path,
      });
      if (!file) {
        return res.status(400).json('Error occuried while uploading the file');
      }
      await user.update({
        avatar_id: file.id,
      });

      return res.json(file);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new FileUploadController();
