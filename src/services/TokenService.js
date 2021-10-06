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
            throw error;
        }
    }

    getAllTokens = async ({ search , index , limit }) => {
        try {
            const tokens = await this.tokenRepository.getAllTokens({ search , index , limit })
            return tokens;
        } catch (error) {
            throw error;
        }
    } 

    getToken = async ({ Tokensymbol , TokenType }) => {
        try {
            const token = await this.tokenRepository.getToken({ Tokensymbol , TokenType })
            return token;
        } catch (error) {
            throw error;
        }
    } 
    getTokenById = async (id) => {
        try {
            const token = await this.tokenRepository.getTokenById(id)
            return token;
        } catch (error) {
            throw error;
        }
    } 

    deleteTokenById = async (id) => {
        try {
            const token = await this.tokenRepository.deleteTokenById(id)
            return token;
        } catch (error) {
            throw error;
        }
    } 
    
}

module.exports = TokenService;

