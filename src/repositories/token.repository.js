const Token = require('../model/token');

const TokenRepository = {

  saveToken: (tokenObj) => {
    return new Promise(async (resolve, reject) => {
      try {
        let token = await Token.create(tokenObj)
        resolve(token);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getToken: (Symbol) => {
    return new Promise(async (resolve, reject) => {
      try {
        let token = await Token.findOne({ Symbol: Symbol }, { ContractABI: 1, _id: 0 })
        if (token) {
          resolve(JSON.parse(token.ContractABI));
        }
        else {
          resolve('');
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getAllTokens: ({ search, index, limit }) => {
    return new Promise(async (resolve, reject) => {
      try {
        let filter = {};
        if (search) {
          filter = { $or: [{ TokenType: { $regex: search, $options: "-i" } }, { TokenName: { $regex: search, $options: "-i" } }, { Symbol: { $regex: search, $options: "-i" } }, { ContractAddress: { $regex: search, $options: "-i" } }] }
        }
        let total_data = await Token.find(filter).countDocuments();
        let tokens = await Token.find(filter, { ContractABI: 0 }).sort({ createdAt : -1}).skip(Number(index - 1) * Number(limit)).limit(Number(limit));
        resolve({ tokens, total_data });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }) 
  },

  getToken: ({ Tokensymbol , TokenType }) => {
    return new Promise(async (resolve, reject) => {
      try {                                                                                                                   
        let filter = {};
        if (Tokensymbol) {
          filter['Symbol'] = Tokensymbol;
        }
        if (TokenType) {
          filter['TokenType'] = TokenType;
        }
        let token_data = await Token.find(filter);
        resolve(token_data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  },

  getTokenById : (id) => {
    return new Promise(async (resolve, reject) => {
      try {                                                                                                                   
        let token_data = await Token.findById({ _id : id });
        resolve(token_data);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })
  }
};

module.exports = TokenRepository;
