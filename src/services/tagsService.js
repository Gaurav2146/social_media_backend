/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const tagRepository = require('../repositories/tags.repository');

class TagsService {
  constructor() {
    this.tagRepository = tagRepository;
  }

  saveNewTag(tagObject) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.tagRepository.saveTag(tagObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllTags() {
    return new Promise((resolve, reject) => {
      try {
        const response = this.tagRepository.getTags();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateTag(tagID, updatedObj) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.tagRepository.editTagDetails(tagID, updatedObj);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  removeTag(tagID) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.tagRepository.deleteTag(tagID);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllFilteredTags(searchString) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.tagRepository.filterTagData(searchString);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}
module.exports = TagsService;
