/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const Subscription = require('../model/subscription');

const tagsRepository = {
  saveSubscription: (subscriptionObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const checkEmail = await Subscription.findOne(subscriptionObject);
        if (!checkEmail) {
          const subscriptionDetail = await Subscription.create(subscriptionObject);
          resolve({ type: 'newSubscription', subscriptionDetail });
        }
        resolve({ type: 'existingEmail', checkEmail });
      } catch (error) {
        reject(error);
      }
    }),

  getSubscriptions: (pageIndex, limit) =>
    new Promise(async (resolve, reject) => {
      try {
        const subscriptionDetail = await Subscription.find()
          .sort({ updatedAt: -1 })
          .skip(pageIndex * limit)
          .limit(limit);
        const subscriptionCount = await Subscription.countDocuments();
        resolve({ subscriptionDetail: subscriptionDetail, subscriptionCount: subscriptionCount });
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = tagsRepository;
