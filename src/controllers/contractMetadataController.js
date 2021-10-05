
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');


const contractMetadataController = {
 
    getContractMetadata : async function (req, res, next) {                                         
    try {
    
      res.status(200).json({ 

        
            "name": "FANCY",
            "description": "Fancy is a NFT Platform",
            "image": "https://fancy.s3.us-east-2.amazonaws.com/assets/fancy_logo.png",
            "external_link": "http://fancy.lapits.com",
        

       });

    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }                                   
  }
  
}

module.exports = contractMetadataController;