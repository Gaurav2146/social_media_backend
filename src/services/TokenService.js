const tokenRepository = require('../repositories/token.repository');

class TokenService {

    constructor() {
        this.tokenRepository = tokenRepository;
    }

    saveToken = async (tokenObj) => {
        try {
            const token = await this.tokenRepository.saveToken(tokenObj)
            return token;
        } catch (error) {
            console.log('Error in Contract Fetching: ', error);
            throw error;
        }
    }

    getAllTokens = async ({ search , index , limit }) => {
        try {
            const tokens = await this.tokenRepository.getAllTokens({ search , index , limit })
            return tokens;
        } catch (error) {
            console.log('Error in Contract Fetching: ', error);
            throw error;
        }
    } 

    getToken = async ({ Tokensymbol , TokenType }) => {
        try {
            const token = await this.tokenRepository.getToken({ Tokensymbol , TokenType })
            return token;
        } catch (error) {
            console.log('Error in Contract Fetching: ', error);
            throw error;
        }
    } 
}

module.exports = TokenService;

