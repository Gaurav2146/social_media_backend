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
    } ,

    getAllTokens : async ({ search , index , limit })=>{
        let filter = {};
        if(search)
        {
            filter =  { $or: [ { TokenType : { $regex : search , $options: "-i" } },{ TokenName : { $regex : search , $options: "-i" } }, { Symbol : { $regex : search , $options: "-i" } } ,{ ContractAddress : { $regex : search , $options: "-i" } } ] }
        }
        
        let total_data = await Token.find(filter).countDocuments();
        
        let tokens = await Token.find( filter , {ContractABI : 0} ).skip( Number(index - 1) * Number(limit) ).limit( Number(limit) );
        
        return {tokens , total_data};
    },

  getToken: async ({ Tokensymbol }) => {

    let token_data = await Token.findOne({ Symbol: Tokensymbol });

    return token_data;
  }
  };
  
  module.exports = TokenRepository;
  