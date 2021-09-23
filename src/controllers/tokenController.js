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

  getAllTokens : async function (req, res, next) {                                         
    try {
        let { search , index , limit  } = req.body;
        let token = await tokenService.getAllTokens( { search , index , limit } );
        res.status(200).json({ success : true , alltoken : token });
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
