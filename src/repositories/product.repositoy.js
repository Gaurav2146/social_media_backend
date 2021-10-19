/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
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
        console.log(error);
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
            $group: {
              _id: '$_id',
              data: { $first: '$$ROOT' },
              tokenDetails: {
                $addToSet: {
                  $mergeObjects: ['$product_tokenDetails', { $arrayElemAt: ['$tokenDetails', 0] }],
                },
              },
              collectionDetails: { $addToSet: { $arrayElemAt: ['$collectionDetails', 0] } },
              tagDetails: { $addToSet: { $arrayElemAt: ['$tagDetails', 0] } },
              brandInfo: { $first: { $arrayElemAt: ['$brandDetails', 0] } },
            },
          },
          { $project: returnDataService.returnDataProductDetail() },
        ]);
        if (Object.keys(productDetail[0].tokenDetails[0] || {}).length <= 0) {
          productDetail[0].tokenDetails = [];
        }
        resolve(productDetail);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  filterProductData: (searchvalue, pageIndex, limit) =>
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
          { $skip: pageIndex * limit },
          { $limit: limit },
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
        const productTotalSize = await Products.find(query).countDocuments();
        productDetail.forEach((element) => {
          if (element.product_withoutVariantDetails == null) {
            element.totalQuantity = element.product_colorAndSizeDetails.reduce((accumulator, colorDetails) => {
              accumulator += colorDetails.sizeInfo.reduce((acc, sizeInfo) => {
                acc += sizeInfo.qty;
                return acc;
              }, 0);
              return accumulator;
            }, 0);
          } else {
            element.totalQuantity = element.product_withoutVariantDetails.qty;
          }
        });
        resolve({ productDetail: productDetail, productTotalSize: productTotalSize });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  editProductDetails: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true });
        resolve(productDetail);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  deleteProduct: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndDelete({ _id: productID });
        resolve(productDetail);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  createProductStepOne: (productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productCreate = await Products.create(productObject);
        resolve(productCreate);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  createProductStepTwo: (productID, productObject, colorImagesDetails) =>
    new Promise(async (resolve, reject) => {
      try {
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
        const productUpdate = await Products.findByIdAndUpdate({ _id: productID }, { $set: productObject }, { new: true });
        resolve(productUpdate);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  createProductStepThree: (productID, color, imagesArray, typeOfProduct) =>
    new Promise(async (resolve, reject) => {
      try {
        let productUpdate;
        if (typeOfProduct === 'variant') {
          productUpdate = await Products.findByIdAndUpdate(
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
        } else {
          const updatedObject = {
            'product_withoutVariantDetails.images': imagesArray,
            product_stepperLastStepVisited: 3,
            product_updatedAt: Date.now(),
          };
          productUpdate = await Products.findByIdAndUpdate({ _id: productID }, { $set: updatedObject }, { new: true });
        }
        resolve(productUpdate);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  updateImagesForColorVariant: (productID, color, imagesArray, variantIndex, deletedImagesArrayOnEditing, typeOfProduct) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetails = await Products.findOne({ _id: productID });
        let imagesDetails;
        if (typeOfProduct === 'variant') {
          imagesDetails = productDetails.product_colorAndSizeDetails[variantIndex].images;
        } else {
          imagesDetails = productDetails.product_withoutVariantDetails.images;
        }
        console.log(imagesDetails);
        if (deletedImagesArrayOnEditing && deletedImagesArrayOnEditing.length > 0) {
          for (let i = 0; i < deletedImagesArrayOnEditing.length; i++) {
            for (let j = 0; j < imagesDetails.length; j++) {
              if (imagesDetails[j].key === deletedImagesArrayOnEditing[i].Key) {
                imagesDetails.splice(j, 1);
              }
            }
          }
        }
        if (imagesArray && imagesArray.length > 0) {
          for (let i = 0; i < imagesArray.length; i++) {
            imagesDetails.push(imagesArray[i]);
          }
        }
        if (typeOfProduct === 'variant') {
          productDetails.product_colorAndSizeDetails[variantIndex].images = imagesDetails;
        } else {
          productDetails.product_withoutVariantDetails.images = imagesDetails;
        }
        productDetails.product_stepperLastStepVisited = 3;
        productDetails.product_updatedAt = Date.now();
        const productUpdate = await Products.findByIdAndUpdate({ _id: productID }, { $set: productDetails }, { new: true });
        resolve(productUpdate);
      } catch (error) {
        console.log(error);
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
  getProductsAdmin: (pageIndex, limit) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.aggregate([
          { $skip: pageIndex * limit },
          { $limit: limit },
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
            },
          },
          { $project: returnDataService.returnDataProductListForAdmin() },
          { $sort: { product_updatedAt: -1 } },
        ]);

        const productTotalSize = await Products.countDocuments();

        productDetail.forEach((element) => {
          if (element.product_withoutVariantDetails == null) {
            element.totalQuantity = element.product_colorAndSizeDetails.reduce((accumulator, colorDetails) => {
              accumulator += colorDetails.sizeInfo.reduce((acc, sizeInfo) => {
                acc += sizeInfo.qty;
                return acc;
              }, 0);
              return accumulator;
            }, 0);
          } else {
            element.totalQuantity = element.product_withoutVariantDetails.qty;
          }
        });
        resolve({ productDetail: productDetail, productTotalSize: productTotalSize });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),

  updateProductQuantity: (obj) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(obj, 'updateProductQuantity');
        let { product_info, Product_id, new_qty, product_withoutVariantDetails } = obj;

        if (!product_withoutVariantDetails) {
          let new_quantity = Number(product_info.qty) - Number(new_qty);
          let product_colorAndSizeDetails = await Products.findById({ _id: Product_id }, { product_colorAndSizeDetails: 1, _id: 0 });
          console.log(product_colorAndSizeDetails.product_colorAndSizeDetails, 'product_colorAndSizeDetails');
          let product_details = product_colorAndSizeDetails.product_colorAndSizeDetails;
          for (let i = 0; i < product_details.length; i++) {
            if (product_details[i]._id == product_info.top_level_id) {
              for (let j = 0; j < product_details[i].sizeInfo.length; j++) {
                if (product_details[i].sizeInfo[j]._id == product_info.size_detail_id) {
                  product_details[i].sizeInfo[j].qty = new_quantity;
                }
              }
            }
          }
          let updated_detail = await Products.findByIdAndUpdate(
            { _id: Product_id },
            { $set: { product_colorAndSizeDetails: product_details } },
            { new: true },
          );
          resolve(updated_detail);
        } else {
          let product_withoutVariantDetails = await Products.findById({ _id: Product_id }, { product_withoutVariantDetails: 1, _id: 0 });
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log(product_withoutVariantDetails.product_withoutVariantDetails, 'product_withoutVariantDetails');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          let product_details = product_withoutVariantDetails.product_withoutVariantDetails;
          let prev_qty = product_details.qty;
          let new_quantity = Number(prev_qty) - Number(new_qty);
          product_details['qty'] = new_quantity;
          let updated_detail = await Products.findByIdAndUpdate(
            { _id: Product_id },
            { $set: { product_withoutVariantDetails: product_details } },
            { new: true },
          );
          resolve(updated_detail);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};

module.exports = productsRepository;
