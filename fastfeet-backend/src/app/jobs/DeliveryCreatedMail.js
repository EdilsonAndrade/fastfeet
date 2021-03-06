import Mail from '../../lib/Mail';

class DeliveryCreatedMail {
  get key() {
    return 'DeliveryCreated';
  }

  async handle({ data }) {
    const { message } = data;

    await Mail.sendMail(message);
  }
}
export default new DeliveryCreatedMail();
