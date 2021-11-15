/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const mongoose = require('mongoose');
const Products = require('../model/product');
const returnDataService = require('../services/returnDataService');
const AddTags = require('../model/tags');
const AddBrands = require('../model/brand');

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
          let filter = [{
              $match: {
                product_status: 'active'
              }
            },
            {
              $lookup: {
                from: 'tags',
                let: {
                  res_tagID: '$product_tags'
                },
                pipeline: [{
                  $match: {
                    $expr: {
                      $in: ['$_id', '$$res_tagID']
                    }
                  }
                }],
                as: 'tagDetails',
              },
            },
            {
              $unwind: '$tagDetails'
            },
            {
              $lookup: {
                from: 'brands',
                let: {
                  brand_ID: '$product_brand'
                },
                pipeline: [{
                  $match: {
                    $expr: {
                      $eq: ['$$brand_ID', '$_id']
                    }
                  }
                }],
                as: 'brandDetails',
              },
            },
            {
              $unwind: '$brandDetails'
            },
            {
              $addFields: {
                TAG: '$tagDetails.tag_name',
              },
            },
            {
              $addFields: {
                BRAND: '$brandDetails.brand_name',
              },
            },
            {
              $addFields: {
                sizeInfo: [],
              },
            },
            {
              $group: {
                _id: '$_id',
                sizeInfo: {
                  $push: {
                    product_colorAndSizeDetails: ['$product_colorAndSizeDetails', [{
                      sizeInfo: ['$product_withoutVariantDetails']
                    }]],
                  },
                },
              },
            },
            {
              $unwind: '$sizeInfo'
            },
            {
              $addFields: {
                product_colorAndSizeDetails: '$sizeInfo.product_colorAndSizeDetails',
              },
            },
            {
              $unwind: '$product_colorAndSizeDetails'
            },
            {
              $unwind: '$product_colorAndSizeDetails'
            },
            {
              $addFields: {
                final_product_colorAndSizeDetails: '$product_colorAndSizeDetails.sizeInfo',
              },
            },
            {
              $unwind: '$final_product_colorAndSizeDetails'
            },
            {
              $group: {
                _id: '$_id',
                maxPrice: {
                  $max: '$final_product_colorAndSizeDetails.price'
                },
              },
            },
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
            filter.push({
              $sort: {
                maxPrice: -1
              }
            });
          } else {
            filter.push({
              $sort: {
                maxPrice: 1
              }
            });
          }
          if (search) {
            filter.splice(7, 0, {
              $match: {
                $or: [{
                    product_name: {
                      $regex: search,
                      $options: '-i'
                    }
                  },
                  {
                    BRAND: {
                      $regex: search,
                      $options: '-i'
                    }
                  },
                  {
                    TAG: {
                      $regex: search,
                      $options: '-i'
                    }
                  },
                ],
              },
            });
          }
          let filter_for_document_count = {
            product_status: 'active'
          };
          if (search) {
            filter_for_document_count = {
              product_status: 'active',
              product_name: {
                $regex: search,
                $options: '-i'
              }
            };
          }
          let totalProducts = await Products.find(filter_for_document_count).countDocuments();
          let productDetail = await Products.aggregate(filter).skip(Number(skip)).limit(Number(limit));
          console.log(productDetail, 'productDetail');
          let product = [];
          for (let i = 0; i < productDetail.length; i++) {
            let prd_data = await Products.findById({
              _id: productDetail[i]._id
            });
            product.push(prd_data);
          }
          resolve({
            productDetail: product,
            totalProducts: totalProducts
          });
        } else {
          let filter = {
            product_status: 'active'
          };

          if (search) {
            let Tag = await AddTags.find({
              tag_name: {
                $regex: search,
                $options: '-i'
              }
            }, {
              _id: 1
            });
            let Brand = await AddBrands.find({
              brand_name: {
                $regex: search,
                $options: '-i'
              }
            }, {
              _id: 1
            });
            console.log(Tag, 'Tag', Brand, 'Brand');
            filter = {
              product_status: 'active',
              $or: [{
                  product_name: {
                    $regex: search,
                    $options: '-i'
                  }
                },
                {
                  product_tags: {
                    $in: Tag
                  }
                },
                {
                  product_brand: {
                    $in: Brand
                  }
                },
              ],
            };

            if (collection) {
              filter = {
                product_status: 'active',
                $or: [{
                    product_name: {
                      $regex: search,
                      $options: '-i'
                    }
                  },
                  {
                    product_tags: {
                      $in: Tag
                    }
                  },
                  {
                    product_brand: {
                      $in: Brand
                    }
                  },
                ],
                product_collectionName: {
                  $in: [collection]
                },
              };
            }

          }

          if (collection && !search) {
            filter = {
              product_status: 'active',
              product_collectionName: {
                $in: [collection]
              },
            };
          }
          const totalProducts = await Products.find(filter).countDocuments();
          const productDetail = await Products.find(filter).skip(Number(skip)).limit(Number(limit));
          console.log(productDetail, 'productDetail');
          resolve({
            productDetail,
            totalProducts
          });
        }
      } catch (error) {
        // eslint-disable-next-line prettier/prettier
        console.log(error, 'error');
        reject(error);
      }
    }),

  getProductDetails: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        productID = mongoose.Types.ObjectId(productID);
        const productDetail = await Products.aggregate([{
            $match: {
              _id: productID
            }
          },
          {
            $unwind: {
              path: '$product_tokenDetails',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $unwind: {
              path: '$product_collectionName',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $unwind: {
              path: '$product_tags',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'tokens',
              let: {
                res_tokenID: '$product_tokenDetails.token_id'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$res_tokenID', '$_id']
                  }
                }
              }],
              as: 'tokenDetails',
            },
          },
          {
            $lookup: {
              from: 'collections',
              let: {
                res_collectionID: '$product_collectionName'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$res_collectionID', '$_id']
                  }
                }
              }],
              as: 'collectionDetails',
            },
          },
          {
            $lookup: {
              from: 'tags',
              let: {
                res_tagID: '$product_tags'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$res_tagID', '$_id']
                  }
                }
              }],
              as: 'tagDetails',
            },
          },
          {
            $lookup: {
              from: 'brands',
              let: {
                brand_ID: '$product_brand'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$brand_ID', '$_id']
                  }
                }
              }],
              as: 'brandDetails',
            },
          },
          {
            $group: {
              _id: '$_id',
              data: {
                $first: '$$ROOT'
              },
              tokenDetails: {
                $addToSet: {
                  $mergeObjects: ['$product_tokenDetails', {
                    $arrayElemAt: ['$tokenDetails', 0]
                  }],
                },
              },
              collectionDetails: {
                $addToSet: {
                  $arrayElemAt: ['$collectionDetails', 0]
                }
              },
              tagDetails: {
                $addToSet: {
                  $arrayElemAt: ['$tagDetails', 0]
                }
              },
              brandInfo: {
                $first: {
                  $arrayElemAt: ['$brandDetails', 0]
                }
              },
            },
          },
          {
            $project: returnDataService.returnDataProductDetail()
          },
        ]);
        if (Object.keys(productDetail[0].tokenDetails[0] || {}).length <= 0) {
          productDetail[0].tokenDetails = [];
        }
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  filterProductData: (searchvalue, pageIndex, limit) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {
          $or: [{
              product_name: {
                $regex: searchvalue,
                $options: 'i'
              }
            },
            {
              'brandDetails.brand_name': {
                $regex: searchvalue,
                $options: 'i'
              }
            },
            {
              'collectionDetails.collection_name': {
                $regex: searchvalue,
                $options: 'i'
              }
            },
          ],
        };
        const productDetail = await Products.aggregate([
          {
            $match: {
              product_deleteStatus: 'activated'
            }
          },
          {
            $lookup: {
              from: 'brands',
              let: {
                brand_ID: '$product_brand'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$brand_ID', '$_id']
                  }
                }
              }],
              as: 'brandDetails',
            },
          },
          {
            $unwind: {
              path: '$product_collectionName',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'collections',
              let: {
                res_collectionID: '$product_collectionName'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$res_collectionID', '$_id']
                  }
                }
              }],
              as: 'collectionDetails',
            },
          },
          {
            $group: {
              _id: '$_id',
              data: {
                $first: '$$ROOT'
              },
              collectionDetails: {
                $addToSet: {
                  $arrayElemAt: ['$collectionDetails', 0]
                }
              },
              brandDetails: {
                $first: {
                  $arrayElemAt: ['$brandDetails', 0]
                }
              },
            },
          },
          {
            $project: returnDataService.returnDataProductListForAdmin()
          },
          {
            $match: query
          },
          {
            $sort: {
              product_updatedAt: -1
            }
          },
          {
            $skip: pageIndex * limit
          },
          {
            $limit: limit
          },
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

        productDetail.forEach((element) => {
          if (element.product_withoutVariantDetails == null) {
            element.product_colorAndSizeDetails.forEach((data) => {
              if (data.images.length !== 0) {
                element.image = data.images[0].file;
              }
            });
          } else {
            // eslint-disable-next-line no-lonely-if
            if (element.product_withoutVariantDetails.images.length !== 0) {
              element.image = element.product_withoutVariantDetails.images[0].file;
            }
          }
        });
        resolve({
          productDetail: productDetail,
          productTotalSize: productTotalSize
        });
      } catch (error) {
        reject(error);
      }
    }),

  editProductDetails: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndUpdate({
          _id: productID
        }, {
          $set: productObject
        }, {
          new: true
        });
        resolve(productDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteProduct: (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findByIdAndDelete({
          _id: productID
        });
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

  createProductStepTwo: (productID, productObject) =>
    new Promise(async (resolve, reject) => {
      try {
        // if (colorImagesDetails && colorImagesDetails.length > 0) {
        //   const productDetails = await Products.findOne({
        //     _id: productID
        //   });
        //   for (let i = 0; i < colorImagesDetails.length; i++) {
        //     console.log(colorImagesDetails[i])
        //     for (let j = 0; j < productDetails.product_colorAndSizeDetails.length; j++) {
        //       console.log(productDetails.product_colorAndSizeDetails[i])
        //       if (productDetails.product_colorAndSizeDetails[j].colorDetails.color === colorImagesDetails[i].colorDetails.color) {
        //         if (productObject.product_colorAndSizeDetails[j]) {
        //           productObject.product_colorAndSizeDetails[j].images = [];
        //         }
        //       }
        //     }
        //   }
        // }

        const productUpdate = await Products.findByIdAndUpdate({
          _id: productID
        }, {
          $set: productObject
        }, {
          new: true
        });
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),

  createProductStepThree: (productID, color, imagesArray, typeOfProduct) =>
    new Promise(async (resolve, reject) => {
      try {
        let productUpdate;
        if (typeOfProduct === 'variant') {
          productUpdate = await Products.findByIdAndUpdate({
              _id: productID,
              product_colorAndSizeDetails: {
                $elemMatch: {
                  'colorDetails.color': color,
                },
              },
            }, {
              $set: {
                'product_colorAndSizeDetails.$[index].images': imagesArray,
                product_stepperLastStepVisited: 3,
                product_updatedAt: Date.now(),
              },
            }, {
              arrayFilters: [{
                'index.colorDetails.color': color
              }],
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
          productUpdate = await Products.findByIdAndUpdate({
            _id: productID
          }, {
            $set: updatedObject
          }, {
            new: true
          });
        }
        resolve(productUpdate);
      } catch (error) {
        reject(error);
      }
    }),

  updateImagesForColorVariant: (productID, color, imagesArray, variantIndex, deletedImagesArrayOnEditing, typeOfProduct) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetails = await Products.findOne({
          _id: productID
        });
        let imagesDetails;
        if (typeOfProduct === 'variant') {
          imagesDetails = productDetails.product_colorAndSizeDetails[variantIndex].images;
        } else {
          imagesDetails = productDetails.product_withoutVariantDetails.images;
        }
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
        if (productDetails.product_stepperLastStepVisited === 2) {
          productDetails.product_stepperLastStepVisited = 3;
        }
        productDetails.product_updatedAt = Date.now();
        const productUpdate = await Products.findByIdAndUpdate({
          _id: productID
        }, {
          $set: productDetails
        }, {
          new: true
        });
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
        // eslint-disable-next-line no-continue
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
        const productDetail = await Products.aggregate([{
            $match: {
              product_deleteStatus: 'activated'
            }
          },
          {
            $unwind: {
              path: '$product_collectionName',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'collections',
              let: {
                res_collectionID: '$product_collectionName'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$res_collectionID', '$_id']
                  }
                }
              }],
              as: 'collectionDetails',
            },
          },
          {
            $lookup: {
              from: 'brands',
              let: {
                brand_ID: '$product_brand'
              },
              pipeline: [{
                $match: {
                  $expr: {
                    $eq: ['$$brand_ID', '$_id']
                  }
                }
              }],
              as: 'brandDetails',
            },
          },
          {
            $group: {
              _id: '$_id',
              data: {
                $first: '$$ROOT'
              },
              collectionDetails: {
                $addToSet: {
                  $arrayElemAt: ['$collectionDetails', 0]
                }
              },
              brandDetails: {
                $first: {
                  $arrayElemAt: ['$brandDetails', 0]
                }
              },
            },
          },
          {
            $project: returnDataService.returnDataProductListForAdmin()
          },
          {
            $sort: {
              product_updatedAt: -1
            }
          },
          {
            $skip: pageIndex * limit
          },
          {
            $limit: limit
          },
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
        productDetail.forEach((element) => {
          if (element.product_withoutVariantDetails == null) {
            element.product_colorAndSizeDetails.forEach((data) => {
              if (data.images.length !== 0) {
                element.image = data.images[0].file;
              }
            });
          } else {
            // eslint-disable-next-line no-lonely-if
            if (element.product_withoutVariantDetails.images.length !== 0) {
              element.image = element.product_withoutVariantDetails.images[0].file;
            }
          }
        });
        resolve({
          productDetail: productDetail,
          productTotalSize: productTotalSize
        });
      } catch (error) {
        reject(error);
      }
    }),

  updateProductQuantity: (obj) =>
    new Promise(async (resolve, reject) => {
      try {
        console.log(obj, 'updateProductQuantity');
        // eslint-disable-next-line camelcase
        let {
          product_info,
          Product_id,
          new_qty,
          product_withoutVariantDetails
        } = obj;

        // eslint-disable-next-line camelcase
        if (!product_withoutVariantDetails) {
          // eslint-disable-next-line camelcase
          let product_colorAndSizeDetails = await Products.findById({
            _id: Product_id
          }, {
            product_colorAndSizeDetails: 1,
            _id: 0
          });
          console.log(product_colorAndSizeDetails.product_colorAndSizeDetails, 'product_colorAndSizeDetails');
          // eslint-disable-next-line camelcase
          let product_details = product_colorAndSizeDetails.product_colorAndSizeDetails;
          for (let i = 0; i < product_details.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (product_details[i]._id == product_info.top_level_id) {
              for (let j = 0; j < product_details[i].sizeInfo.length; j++) {
                // eslint-disable-next-line eqeqeq
                if (product_details[i].sizeInfo[j]._id == product_info.size_detail_id) {
                  // eslint-disable-next-line camelcase
                  let new_quantity = Number(product_details[i].sizeInfo[j].remaining_qty) - Number(new_qty);
                  // eslint-disable-next-line camelcase
                  product_details[i].sizeInfo[j].remaining_qty = new_quantity;
                }
              }
            }
          }
          // eslint-disable-next-line camelcase
          let updated_detail = await Products.findByIdAndUpdate({
            _id: Product_id
          }, {
            $set: {
              product_colorAndSizeDetails: product_details
            }
          }, {
            new: true
          }, );
          resolve(updated_detail);
        } else {
          // eslint-disable-next-line camelcase
          // eslint-disable-next-line no-shadow
          let product_withoutVariantDetails = await Products.findById({
            _id: Product_id
          }, {
            product_withoutVariantDetails: 1,
            _id: 0
          });
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          console.log(product_withoutVariantDetails.product_withoutVariantDetails, 'product_withoutVariantDetails');
          console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
          // eslint-disable-next-line camelcase
          let product_details = product_withoutVariantDetails.product_withoutVariantDetails;
          let prev_qty = product_details.remaining_qty;
          let new_quantity = Number(prev_qty) - Number(new_qty);
          product_details.remaining_qty = new_quantity;
          // eslint-disable-next-line camelcase
          let updated_detail = await Products.findByIdAndUpdate({
            _id: Product_id
          }, {
            $set: {
              product_withoutVariantDetails: product_details
            }
          }, {
            new: true
          }, );
          resolve(updated_detail);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    }),


    getProductDetailsById : (productID) =>
    new Promise(async (resolve, reject) => {
      try {
        const productDetail = await Products.findById({ _id: productID });
        resolve(productDetail);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    })

};

module.exports = productsRepository;