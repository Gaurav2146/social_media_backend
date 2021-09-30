/* eslint-disable consistent-return */
const isHttpError = require('http-errors');

const TagsService = require('../services/tagsService');

const tagsService = new TagsService();

const tagsCtlr = {
  addTag: async function (req, res, next) {
    try {
      const tagObject = req.body;
      const response = await tagsService.saveNewTag(tagObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ success: false, message: 'something went wrong!' });
      }
    }
  },
  updateTag: async function (req, res, next) {
    try {
      const { tagID, tagObject } = req.body;
      const response = await tagsService.updateTag(tagID, tagObject);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getTags: async function (req, res, next) {
    try {
      const response = await tagsService.getAllTags();
      return res.status(200).json({ success: true, data: response, msg: 'All Tags Fetched' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  getFilteredTags: async function (req, res, next) {
    try {
      const { tagSearchValue } = req.body;
      if (tagSearchValue) {
        const response = await tagsService.getAllFilteredTags(tagSearchValue);
        return res.status(200).json({ success: true, data: response, msg: 'All Tags Fetched' });
      }
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
  deleteTag: async function (req, res, next) {
    try {
      const { tagID } = req.body;
      const response = await tagsService.removeTag(tagID);
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

module.exports = tagsCtlr;
