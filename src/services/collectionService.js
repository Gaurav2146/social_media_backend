/* eslint-disable no-async-promise-executor */
/* eslint-disable no-param-reassign */
const collectionRepository = require('../repositories/collection.repository');

class collectionsService {
  constructor() {
    this.collectionRepository = collectionRepository;
  }

  addNewCollection(collectionObject) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.collectionRepository.saveCollection(collectionObject);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllCollections() {
    return new Promise((resolve, reject) => {
      try {
        const response = this.collectionRepository.getCollections();
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  updateCollection(collectionID, updatedObj) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.collectionRepository.editCollectionDetails(collectionID, updatedObj);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  removeCollection(collectionID) {
    return new Promise((resolve, reject) => {
      try {
        const response = this.collectionRepository.deleteCollection(collectionID);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }

  getAllFilteredCollections(searchString) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.collectionRepository.filterCollectionData(searchString);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  }
}
module.exports = collectionsService;
