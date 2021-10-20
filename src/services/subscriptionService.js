/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const subscriptionRepository = require('../repositories/subscription.repository');

class SubscriptionService {
  constructor() {
    this.subscriptionRepository = subscriptionRepository;
  }

  saveNewSubscription(subscriptionObject) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.subscriptionRepository.saveSubscription(subscriptionObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllSubscriptions() {
    return new Promise((resolve, reject) => {
      try {
        const response = this.subscriptionRepository.getSubscriptions();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = SubscriptionService;
