/* eslint-disable consistent-return */
const isHttpError = require('http-errors');
// eslint-disable-next-line import/newline-after-import
const SmartContractService = require('../services/smartContract.service');
const smartContractService = new SmartContractService();
// https://mainnet.infura.io/v3/fb6818b1126040b1a9b6fdfea0ac8577

const smartContractCtl = {
  getBalance: async function (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { address, contract_address, Tokensymbol } = req.query;
      const balance = await smartContractService.getAddressBalance(address, contract_address, Tokensymbol);
      res.status(200).json({ success: true, balance: balance });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

};

module.exports = smartContractCtl;
