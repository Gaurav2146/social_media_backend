/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const TokenService = require('../services/TokenService');
const tokenService = new TokenService();

const tokenCtl = {
 
    saveToken : async function (req, res, next) {                                         
    try {
        let tokenObj = req.body;
        let token = await tokenService.saveToken(tokenObj);
        res.status(200).json({ success : true , token_data : token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  } ,

  editToken : async function (req, res, next) {                                         
    try {
        let {tokenObj , id } = req.body;
        let token = await tokenService.editToken(tokenObj , id);
        res.status(200).json({ success : true , token_data : token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  } ,


  getAllTokens : async function (req, res, next) {                                         
    try {
        let { search , index , limit  } = req.body;
        let token = await tokenService.getAllTokens( { search , index , limit } );
        let { tokens , total_data } = token;
        res.status(200).json({ success : true , alltoken : tokens , total_data : total_data });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  },

  getTokenDetail : async function (req, res, next) {                                         
    try {
        let { Tokensymbol , TokenType } = req.body;
        let token = await tokenService.getToken( { Tokensymbol , TokenType } );
        res.status(200).json({ success : true , token_detail : token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  },

  getTokenById : async function (req, res, next) {                                         
    try {
        let { id } = req.query;
        let token = await tokenService.getTokenById( id );
        res.status(200).json({ success : true , token_detail : token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  },

  deleteToken : async function (req, res, next) {                                         
    try {
        let { id } = req.query;
        let token = await tokenService.deleteTokenById( id );
        res.status(200).json({ success : true , token_detail : token });
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  }
  
}


module.exports = tokenCtl;
