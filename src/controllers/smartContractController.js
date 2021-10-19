/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const SmartContractService = require('../services/smartContract.service');
const smartContractService = new SmartContractService();

//https://mainnet.infura.io/v3/fb6818b1126040b1a9b6fdfea0ac8577

const smartContractCtl = {
  getBalance: async function (req, res, next) {
    try {
      const { address, contract_address, Tokensymbol } = req.query;
      let balance = await smartContractService.getAddressBalance(address, contract_address, Tokensymbol);
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
