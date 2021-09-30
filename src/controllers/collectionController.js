/* eslint-disable consistent-return */
const isHttpError = require('http-errors');
const CollectionService = require('../services/collectionService');

const collectionService = new CollectionService();

const collectionCtlr = {
  addCollection: async function (req, res, next) {
    try {
      const collectionObject = req.body;
      const response = await collectionService.addNewCollection(collectionObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateCollection: async function (req, res, next) {
    try {
      const { collectionID, collectionObject } = req.body;
      const response = await collectionService.updateCollection(collectionID, collectionObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getCollections: async function (req, res, next) {
    try {
      const response = await collectionService.getAllCollections();
      return res.status(200).json({ success: true, data: response, msg: 'All Collections Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getFilteredCollections: async function (req, res, next) {
    try {
      const { collectionSearchValue } = req.body;
      if (collectionSearchValue) {
        const response = await collectionService.getAllFilteredCollections(collectionSearchValue);
        return res.status(200).json({ success: true, data: response, msg: 'All Collections Fetched' });
      }
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  deleteCollection: async function (req, res, next) {
    try {
      const { collectionID } = req.body;
      const response = await collectionService.removeCollection(collectionID);
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

module.exports = collectionCtlr;
