
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');


const contractMetadataController = {
 
    getContractMetadata : async function (req, res, next) {                                         
    try {
    
      res.status(200).json({ 

        
            "name": "OpenSea Creatures",
            "description": "OpenSea Creatures are adorable aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
            "image": "https://openseacreatures.io/image.png",
            "external_link": "https://openseacreatures.io",
        

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