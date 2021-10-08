const shippingDetailRepository = require('../repositories/shippingDetailRepository');

class shippingDetailService {

    constructor() {
        this.shippingDetailRepository = shippingDetailRepository;
    }

    addShippingDetail = async (obj , Order_Id) => {
        try {
            const token = await this.shippingDetailRepository.addShippingDetail(obj , Order_Id);
            return token;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

   
}

module.exports = shippingDetailService;
