/* eslint-disable arrow-body-style */
exports.returnDataProductList = () => {
  return {
    product_name: 1,
    product_brand: 1,
    product_weight: 1,
    product_weightUnit: 1,
    product_updatedAt: 1,
    product_status: 1,
    product_stepper: 1,
    product_stepperStatus: 1,
    product_colorAndSizeDetails: 1,
  };
};
exports.returnDataProductListForAdmin = () => {
  return {
    product_name: '$data.product_name',
    product_brand: '$data.product_brand',
    product_tags: '$data.product_tags',
    product_description: '$data.product_description',
    product_withoutVariantDetails: '$data.product_withoutVariantDetails',
    product_tokenDetails: '$data.product_tokenDetails',
    _id: '$data._id',
    product_weight: '$data.product_weight',
    product_weightUnit: '$data.product_weightUnit',
    product_updatedAt: '$data.product_updatedAt',
    product_createdAt: '$data.product_createdAt',
    product_status: '$data.product_status',
    product_colorAndSizeDetails: '$data.product_colorAndSizeDetails',
    product_stepperLastStepVisited: '$data.product_stepperLastStepVisited',
    product_stepperStatus: '$data.product_stepperStatus',
    collectionDetails: '$collectionDetails',
    brandDetails: '$brandDetails',
    // data: { $first: '$$ROOT' },
  };
};
exports.returnDataProductDetail = () => {
  return {
    product_name: '$data.product_name',
    product_otherDetails: '$data.product_otherDetails',
    _id: '$data._id',
    product_weight: '$data.product_weight',
    product_weightUnit: '$data.product_weightUnit',
    product_description: '$data.product_description',
    product_updatedAt: '$data.product_updatedAt',
    product_status: '$data.product_status',
    product_stepper: '$data.product_stepper',
    product_stepperStatus: '$data.product_stepperStatus',
    product_withoutVariantDetails: '$data.product_withoutVariantDetails',
    product_stepperLastStepVisited: '$data.product_stepperLastStepVisited',
    nft_image: '$data.nft_image',
    product_colorAndSizeDetails: '$data.product_colorAndSizeDetails',
    tokenDetails: '$tokenDetails',
    collectionDetails: '$collectionDetails',
    brandInfo: '$brandInfo',
    tagDetails: '$tagDetails',
  };
};
