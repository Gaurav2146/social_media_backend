const fancyContractAbi = require('../ABI/usdt-contract-abi-fancy');
const web3 = require('web3');
const config = require('../config/default.json');
const web3http = new web3(new web3.providers.HttpProvider(config.HTTP_URL_INFURA));
const tokenRepository = require('../repositories/token.repository');

class SmartContractService {

    constructor() {
        this.tokenRepository = tokenRepository;
    }

    // To get a new Contract Instance from Contract ABI & Contract Address
    getContractInstance = async (contract_address) => {
        try {
            let Contract_ABI = await this.tokenRepository.getToken({ Tokensymbol: 'BAYC' });
            if (Contract_ABI && Contract_ABI[0] && Contract_ABI[0].ContractABI) {
                console.log(Contract_ABI, 'Contract_ABI');
                const contract = await new web3http.eth.Contract(JSON.parse(JSON.parse(Contract_ABI[0].ContractABI)), contract_address);
                return contract;
            }
            else {
                return '';
            }
        } catch (error) {
            console.log('Error in Contract Fetching: ', error);
            throw error;
        }
    }


    // To get address balance from blockchain
    getAddressBalance = async (address, contract_address) => {
        try {
            const contract = await this.getContractInstance(contract_address);
            let balance = await contract.methods.balanceOf(address).call();
            return balance;
        } catch (error) {
            console.log('Error in Contract Fetching: ', error);
            throw error;
        }
    }
}

module.exports = SmartContractService;

