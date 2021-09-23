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

}

module.exports = TokenService;

