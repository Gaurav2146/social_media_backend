/* eslint-disable no-param-reassign */
/* eslint-disable no-async-promise-executor */
const Tags = require('../model/tags');

const tagsRepository = {
  saveTag: (tagObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const tagsDetail = await Tags.create(tagObject);
        resolve(tagsDetail);
      } catch (error) {
        reject(error);
      }
    }),

  getTags: () =>
    new Promise(async (resolve, reject) => {
      try {
        const tagDetail = await Tags.find().sort({ tag_updatedAt: -1 });
        resolve(tagDetail);
      } catch (error) {
        reject(error);
      }
    }),

  filterTagData: (searchvalue) =>
    new Promise(async (resolve, reject) => {
      try {
        const tagDetail = await Tags.aggregate([
          { $match: { tag_name: { $regex: searchvalue, $options: 'i' } } },
          { $sort: { brand_updatedAt: -1 } },
          {
            $project: {
              tag_name: 1,
              tag_createdAt: 1,
              tag_updatedAt: 1,
            },
          },
        ]);
        resolve(tagDetail);
      } catch (error) {
        reject(error);
      }
    }),

  editTagDetails: (tagID, tagObject) =>
    new Promise(async (resolve, reject) => {
      try {
        const tagDetail = await Tags.findByIdAndUpdate({ _id: tagID }, { $set: tagObject }, { new: true });
        resolve(tagDetail);
      } catch (error) {
        reject(error);
      }
    }),

  deleteTag: (tagID) =>
    new Promise(async (resolve, reject) => {
      try {
        const tagDetail = await Tags.findByIdAndDelete({ _id: tagID });
        resolve(tagDetail);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = tagsRepository;
