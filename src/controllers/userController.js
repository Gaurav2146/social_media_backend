/* eslint-disable consistent-return */
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');



const userCtl = {
 
    getProducts: async function (req, res, next) {                                         
    try {
      const {  skip , limit } = req.query;

      console.log( skip , 'skip' , limit , 'limit');

      let output_array = [];

      let obj1 = { }
                      
      res.status(200).json({ success : true , eligible_product : 6 });

    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  }
  
}


module.exports = userCtl;
