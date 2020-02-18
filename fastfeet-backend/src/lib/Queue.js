import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import DeliveryCreatedMail from '../app/jobs/DeliveryCreatedMail';
import DeliveryCanceledMail from '../app/jobs/DeliveryCanceledMail';

require('../bootstrap');

const jobs = [DeliveryCreatedMail, DeliveryCanceledMail];

class Queue {
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      this.queues = {};
      this.init();
    }
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    if (process.env.NODE_ENV !== 'test') {
      return this.queues[queue].bee.createJob(job).save();
    }
    return null;
  }

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name} failed: ${err}`);
  }
}
export default new Queue();
