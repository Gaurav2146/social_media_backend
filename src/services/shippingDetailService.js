const shippingDetailRepository = require('../repositories/shippingDetailRepository');

class shippingDetailService {

    constructor() {
        this.shippingDetailRepository = shippingDetailRepository;
    }

    addShippingDetail = async (obj) => {
        try {
            const token = await this.shippingDetailRepository.addShippingDetail(obj);
            return token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

   
}

module.exports = shippingDetailService;
