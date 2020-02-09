import Mail from '../../lib/Mail';

class DeliveryCanceledMail {
  get key() {
    return 'DeliveryCanceled';
  }

  async handle({ data }) {
    const { message } = data;

    await Mail.sendMail(message);
  }
}
export default new DeliveryCanceledMail();
