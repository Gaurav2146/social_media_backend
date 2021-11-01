/* eslint-disable consistent-return */
const isHttpError = require('http-errors');

const SubscriptionService = require('../services/subscriptionService');

const subscriptionService = new SubscriptionService();

const mailer = require('../helper_services/mail.service');

const subscriptionCtlr = {
  addSubscriptionDetail: async function (req, res, next) {
    try {
      let { email } = req.body;
      email = email.toLowerCase();
      const response = await subscriptionService.saveNewSubscription({ email: email });
      if (response.type === 'existingEmail') {
        return res.status(200).json({ success: false, data: null, msg: 'Email Already Exists!' });
      }
      const mail = await mailer(email, 'New Subscription Added', 'views/subscriptionTemplate/subscription.ejs', {});
      console.log(mail);
      if (mail) {
        return res.status(200).json({ success: true, data: response, msg: 'Subscription Added!' });
      }
    } catch (e) {
      return res.status(400).json({ msg: 'Something Went wrong!', error: e });
    }
  },
  getAllSubscriptions: async function (req, res, next) {
    try {
      let { pageIndex, limit } = req.body;
      pageIndex -= 1;
      limit = parseInt(limit, 10);
      const response = await subscriptionService.getAllSubscriptions(pageIndex, limit);
      return res.status(200).json({
        success: true,
        data: response.subscriptionDetail,
        totalSize: response.subscriptionCount,
        msg: 'All Subscriptions Fetched',
      });
    } catch (e) {
      return res.status(400).json({ msg: 'Something Went wrong!', error: e });
    }
  },
};

module.exports = subscriptionCtlr;
