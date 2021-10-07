/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const mongoose = require('mongoose');
const Products = require('../model/product');
const returnDataService = require('../services/returnDataService');

const productsRepository = {
  saveProduct: (productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.create(productObject);
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getProducts: (skip = 0, limit = 10, search = '', filterType = '', collection) =>
    new Promise(async (resolve, reject) => {
      try {
        if (filterType) {
          let filter = [
            { $match: { product_status: 'active' } },
            { $unwind: '$product_colorAndSizeDetails' },
            {
              $addFields: {
                sizeInfo: '$product_colorAndSizeDetails.sizeInfo',
              },
            },
            { $unwind: '$sizeInfo' },
            { $group: { _id: '$_id', maxPrice: { $max: '$sizeInfo.price' } } },
          ];

          if (collection) {
            filter.unshift({
              $match: {
                $expr: {
                  $in: [mongoose.Types.ObjectId(collection), '$product_collectionName'],
                },
              },
            });
          }

          if (filterType === 'HighToLow') {
            filter.push({ $sort: { maxPrice: -1 } });
          } else {
            filter.push({ $sort: { maxPrice: 1 } });
          }
          if (search) {
            filter.unshift({ $match: { product_name: { $regex: search, $options: '-i' } } });
          }
          let filter_for_document_count = {};
          if (search) {
            filter_for_document_count = { product_name: { $regex: search, $options: '-i' } };
          }
          let totalProducts = await Products.find(filter_for_document_count).countDocuments();
          let productDetail = await Products.aggregate(filter).skip(Number(skip)).limit(Number(limit));
          console.log(productDetail, 'productDetail');
          let product = [];
          for (let i = 0; i < productDetail.length; i++) {
            let prd_data = await Products.findById({ _id: productDetail[i]._id });
            product.push(prd_data);
          }
          resolve({ productDetail: product, totalProducts: totalProducts });
        } else {
          let filter = { product_status: 'active' };
          if (search) {
            filter = { product_status: 'active', product_name: { $regex: search, $options: '-i' } };
          }
          if (collection) {
            filter = {
              product_status: 'active',
              product_name: { $regex: search, $options: '-i' },
              product_collectionName: { $in: [collection] },
            };
          }
          const totalProducts = await Products.find(filter).countDocuments();
          const productDetail = await Products.find(filter).skip(Number(skip)).limit(Number(limit));
          resolve({ productDetail, totalProducts });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  getProductDetails: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        productID = mongoose.Types.ObjectId(productID);
        const productDetail = await Products.aggregate([
          { $match: { _id: productID } },
          { $unwind: { path: '$product_tokenDetails', preserveNullAndEmptyArrays: true } },
          { $unwind: { path: '$product_collectionName', preserveNullAndEmptyArrays: true } },
          { $unwind: { path: '$product_tags', preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: 'tokens',
              let: { res_tokenID: '$product_tokenDetails.token_id' },
              pipeline: [{ $match: { $expr: { $eq: ['$$res_tokenID', '$_id'] } } }],
              as: 'tokenDetails',
            },
          },
          {
            $lookup: {
              from: 'collections',
              let: { res_collectionID: '$product_collectionName' },
              pipeline: [{ $match: { $expr: { $eq: ['$$res_collectionID', '$_id'] } } }],
              as: 'collectionDetails',
            },
          },
          {
            $lookup: {
              from: 'tags',
              let: { res_tagID: '$product_tags' },
              pipeline: [{ $match: { $expr: { $eq: ['$$res_tagID', '$_id'] } } }],
              as: 'tagDetails',
            },
          },
          {
            $lookup: {
              from: 'brands',
              let: { brand_ID: '$product_brand' },
              pipeline: [{ $match: { $expr: { $eq: ['$$brand_ID', '$_id'] } } }],
              as: 'brandDetails',
            },
          },
          {
            $cond: [
              {
                $and: [
                  // if
                  { $eq: [1, { $size: '$data.marks.Score' }] },
                  { $arrayElemAt: ['$data.marks.Score.history', 0] },
                ],
              },
              { $arrayElemAt: ['$data.marks.Score.history', 0] }, // then (use value of history)
              null,
            ],
          },
          {
            $group: {
              _id: '$_id',
              data: { $first: '$$ROOT' },
              tokenDetails: { $addToSet: { $mergeObjects: ['$product_tokenDetails', { $arrayElemAt: ['$tokenDetails', 0] }] } },
              collectionDetails: { $addToSet: { $arrayElemAt: ['$collectionDetails', 0] } },
              tagDetails: { $addToSet: { $arrayElemAt: ['$tagDetails', 0] } },
              brandInfo: { $first: { $arrayElemAt: ['$brandDetails', 0] } },
            },
          },
          { $project: returnDataService.returnDataProductDetail() },
        ]);
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  filterProductData: (searchvalue) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          $or: [
            { product_name: { $regex: searchvalue, $options: 'i' } },
            { 'brandDetails.brand_name': { $regex: searchvalue, $options: 'i' } },
            { 'collectionDetails.collection_name': { $regex: searchvalue, $options: 'i' } },
          ],
        };
        const productDetail = await Products.aggregate([
          {
            $lookup: {
              from: 'brands',
              let: { brand_ID: '$product_brand' },
              pipeline: [{ $match: { $expr: { $eq: ['$$brand_ID', '$_id'] } } }],
              as: 'brandDetails',
            },
          },
          { $unwind: { path: '$product_collectionName', preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: 'collections',
              let: { res_collectionID: '$product_collectionName' },
              pipeline: [{ $match: { $expr: { $eq: ['$$res_collectionID', '$_id'] } } }],
              as: 'collectionDetails',
            },
          },
          {
            $group: {
              _id: '$_id',
              data: { $first: '$$ROOT' },
              collectionDetails: { $addToSet: { $arrayElemAt: ['$collectionDetails', 0] } },
              brandDetails: { $first: { $arrayElemAt: ['$brandDetails', 0] } },
            },
          },
          { $project: returnDataService.returnDataProductListForAdmin() },
          { $match: query },
          { $sort: { product_updatedAt: -1 } },
        ]);
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  editProductDetails: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteProduct: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndDelete({ _id: productID });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepOne: (productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productCreate = await Products.create(productObject);
        resolve(productCreate);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepTwo: (productID, productObject, colorImagesDetails) =>
    new Promise(async (resolve, reject) => {
      try {
        if (colorImagesDetails && colorImagesDetails.length > 0) {
          for (let i = 0; i < colorImagesDetails.length; i++) {
            // eslint-disable-next-line no-await-in-loop
            await Products.findByIdAndUpdate(
              {
                _id: productID,
                product_colorAndSizeDetails: {
                  $elemMatch: {
                    'colorDetails.color': colorImagesDetails[i].colorDetails.color,
                  },
                },
              },
              {
                $set: {
                  'product_colorAndSizeDetails.$[outer].images': [],
                },
              },
              {
                arrayFilters: [{ 'outer.colorDetails.color': colorImagesDetails[i].colorDetails.color }],
              },
              (err, result) => {
                if (err) {
                  console.log(`Error updating service: ${err}`);
                } else {
                  console.log(`${result} document(s) updated`);
                }
              },
            );
          }
        }
        // resolve(productUpdate);
        const productUpdate = await Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true });
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepThree: (productID, color, imagesArray) =>
    new Promise(async (resolve, reject) => {
      try {
        const productUpdate = await Products.findByIdAndUpdate(
          {
            _id: productID,
            product_colorAndSizeDetails: {
              $elemMatch: {
                'colorDetails.color': color,
              },
            },
          },
          {
            $set: {
              'product_colorAndSizeDetails.$[outer].images': imagesArray,
              product_stepperStatus: true,
              product_stepperLastStepVisited: 3,
              product_updatedAt: Date.now(),
            },
          },
          {
            arrayFilters: [{ 'outer.colorDetails.color': color }],
          },
          (err, result) => {
            if (err) {
              console.log(`Error updating service: ${err}`);
            } else {
              console.log(`${result} document(s) updated`);
            }
          },
        );
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),

  Filter: (array) => {
    let map = new Map();
    let res = [];
    for (let i = 0; i < array.length; i++) {
      if (map.has(array[i]._id.toString())) {
        continue;
      } else {
        res.push(array[i]);
        map.set(array[i]._id.toString(), true);
      }
    }
    return res;
  },
  getProductsAdmin: () =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.aggregate([
          { $unwind: { path: '$product_collectionName', preserveNullAndEmptyArrays: true } },
          // { $unwind: { path: '$product_colorAndSizeDetails', preserveNullAndEmptyArrays: true } },
          {
            $lookup: {
              from: 'collections',
              let: { res_collectionID: '$product_collectionName' },
              pipeline: [{ $match: { $expr: { $eq: ['$$res_collectionID', '$_id'] } } }],
              as: 'collectionDetails',
            },
          },
          {
            $lookup: {
              from: 'brands',
              let: { brand_ID: '$product_brand' },
              pipeline: [{ $match: { $expr: { $eq: ['$$brand_ID', '$_id'] } } }],
              as: 'brandDetails',
            },
          },
          {
            $group: {
              _id: '$_id',
              data: { $first: '$$ROOT' },
              collectionDetails: { $addToSet: { $arrayElemAt: ['$collectionDetails', 0] } },
              brandDetails: { $first: { $arrayElemAt: ['$brandDetails', 0] } },
              // count: { $sum: '$product_colorAndSizeDetails.sizeInfo.qty' },
            },
          },
          { $project: returnDataService.returnDataProductListForAdmin() },
          { $sort: { product_updatedAt: -1 } },
        ]);
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = productsRepository;
