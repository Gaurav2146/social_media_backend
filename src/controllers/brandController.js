/* eslint-disable consistent-return */
const isHttpError = require('http-errors');
const BrandService = require('../services/brandService');

const brandService = new BrandService();

const brandCtlr = {
  addBrand: async function (req, res, next) {
    try {
      const brandObject = req.body;
      const response = await brandService.addNewBrand(brandObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateBrand: async function (req, res, next) {
    try {
      const { brandID, brandObject } = req.body;
      const response = await brandService.updateBrand(brandID, brandObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getBrands: async function (req, res, next) {
    try {
      const response = await brandService.getAllBrands();
      return res.status(200).json({ success: true, data: response, msg: 'All Brands Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getFilteredBrands: async function (req, res, next) {
    try {
      const { brandSearchValue } = req.body;
      if (brandSearchValue) {
        const response = await brandService.getAllFilteredBrands(brandSearchValue);
        return res.status(200).json({ success: true, data: response, msg: 'All Products Fetched' });
      }
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  deleteBrand: async function (req, res, next) {
    try {
      const { brandID } = req.body;
      const response = await brandService.removeBrand(brandID);
      res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
};

module.exports = brandCtlr;
