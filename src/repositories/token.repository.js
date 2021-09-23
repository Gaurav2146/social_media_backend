const Token = require('../model/token');

const TokenRepository = {
    
    saveToken: (tokenObj) => Token.create(tokenObj),
    
    getToken: async (Symbol) =>{

      let token = await  Token.findOne({ Symbol : Symbol } , { ContractABI : 1 , _id : 0 })

      if(token)
      {
        return JSON.parse( token.ContractABI );
      }
      else
      {
        return '';
      }
    } 
  };
  
  module.exports = TokenRepository;
  