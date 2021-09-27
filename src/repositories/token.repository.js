const Token = require('../model/token');

const TokenRepository = {

  saveToken: (tokenObj) => {
    try {
      Token.create(tokenObj)
    } catch (error) {
      console.log(error);
    }
  },

  getToken: async (Symbol) => {
    try {
      let token = await Token.findOne({ Symbol: Symbol }, { ContractABI: 1, _id: 0 })
      if (token) {
        return JSON.parse(token.ContractABI);
      }
      else {
        return '';
      }
    } catch (error) {
      console.log(error);
    }
  },

  getAllTokens: async ({ search, index, limit }) => {
    try {
      let filter = {};
      if (search) {
        filter = { $or: [{ TokenType: { $regex: search, $options: "-i" } }, { TokenName: { $regex: search, $options: "-i" } }, { Symbol: { $regex: search, $options: "-i" } }, { ContractAddress: { $regex: search, $options: "-i" } }] }
      }
      let total_data = await Token.find(filter).countDocuments();
      let tokens = await Token.find(filter, { ContractABI: 0 }).skip(Number(index - 1) * Number(limit)).limit(Number(limit));
      return { tokens, total_data };
    } catch (error) {
      console.log(error);
    }
  },

  getToken: async ({ Tokensymbol, TokenType }) => {
    try {
      let filter = {};
      if (Tokensymbol) {
        filter['Tokensymbol'] = Tokensymbol;
      }
      if (TokenType) {
        filter['TokenType'] = TokenType;
      }
      let token_data = await Token.findOne(filter);
      return token_data;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = TokenRepository;
