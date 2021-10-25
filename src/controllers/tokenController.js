/* eslint-disable consistent-return */
// const { BadRequest, InternalServerError } = require('http-errors');

const isHttpError = require('http-errors');

const TokenService = require('../services/TokenService');

const tokenService = new TokenService();

const tokenCtl = {
  saveToken: async function (req, res, next) {
    try {
      const tokenObj = req.body;
      const token = await tokenService.saveToken(tokenObj);
      res.status(200).json({ success: true, token_data: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  editToken: async function (req, res, next) {
    try {
      const { tokenObj, id } = req.body;
      const token = await tokenService.editToken(tokenObj, id);
      res.status(200).json({ success: true, token_data: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getAllTokens: async function (req, res, next) {
    try {
      const { search, index, limit } = req.body;
      const token = await tokenService.getAllTokens({ search, index, limit });
      const { tokens, total_data } = token;
      res.status(200).json({ success: true, alltoken: tokens, total_data: total_data });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getTokenDetail: async function (req, res, next) {
    try {
      const { Tokensymbol, TokenType } = req.body;
      const token = await tokenService.getToken({ Tokensymbol, TokenType });
      res.status(200).json({ success: true, token_detail: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getFilteredTokens: async function (req, res, next) {
    try {
      console.log(req.body);
      const { Tokensymbol, TokenType } = req.body;
      const token = await tokenService.getToken({ Tokensymbol, TokenType });
      res.status(200).json({ success: true, token_detail: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getFilteredTokensForAdmin: async function (req, res, next) {
    try {
      console.log(req.body);
      const { TokenName } = req.body;
      const token = await tokenService.getFilteredTokensForAdmin(TokenName);
      res.status(200).json({ success: true, token_detail: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getTokenById: async function (req, res, next) {
    try {
      const { id } = req.query;
      const token = await tokenService.getTokenById(id);
      res.status(200).json({ success: true, token_detail: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  deleteToken: async function (req, res, next) {
    try {
      const { id } = req.query;
      const token = await tokenService.deleteTokenById(id);
      res.status(200).json({ success: true, token_detail: token, msg: 'Token Deleted Successfully!' });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },

  getAllTokensForProducts: async function (req, res, next) {
    try {
      const token = await tokenService.getAllTokensForProducts();
      return res.status(200).json({ success: true, token_detail: token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  },
};

module.exports = tokenCtl;
