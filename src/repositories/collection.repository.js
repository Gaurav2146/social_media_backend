/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const Collection = require('../model/productCollection');

const collectionsRepository = {
  saveCollection: (collectionObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectionDetail = await Collection.create(collectionObject);
        resolve(collectionDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getCollections: () =>
    new Promise(async (resolve, reject) => {
      try {
        const collectionDetail = await Collection.find().sort({ collection_updatedAt: -1 });
        resolve(collectionDetail);
      } catch (error) {
        reject(error);
      }
    }),

  filterCollectionData: (searchvalue) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectionDetail = await Collection.aggregate([
          { $match: { collection_name: { $regex: searchvalue, $options: 'i' } } },
          { $sort: { collection_updatedAt: -1 } },
          {
            $project: {
              collection_name: 1,
              collection_updatedAt: 1,
              collection_createdAt: 1,
            },
          },
        ]);
        resolve(collectionDetail);
      } catch (error) {
        reject(error);
      }
    }),

  editCollectionDetails: (collectionID, collectionObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectionDetail = await Collection.findByIdAndUpdate({ _id: collectionID }, { $set: collectionObject }, { new: true });
        resolve(collectionDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteCollection: (collectionID) =>
    new Promise(async (resolve, reject) => {
      try {
        const collectionDetail = await Collection.findByIdAndDelete({ _id: collectionID });
        resolve(collectionDetail);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = collectionsRepository;
