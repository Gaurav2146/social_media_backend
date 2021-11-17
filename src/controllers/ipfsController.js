/* eslint-disable no-undef */
const request = require('request');

const { BadRequest, InternalServerError } = require('http-errors');

const isHttpError = require('http-errors');

const https = require('https');

const projectId = '1z5U6e17vOGlZCt3Te6KpfFuxVW';

const projectSecret = 'b81f455dedc260e5a1fb3f17510ec0be';

const fs = require('fs');

const FormData = require('form-data');

const IPFSService = require('../services/ipfsService');

const ipfsService = new IPFSService();

const product = require('../model/product');

const ipfsController = {
  // eslint-disable-next-line consistent-return
  saveDetailsToIPFS: async function (req, res) {
    try {
      const file = req.files[0];
      const { productID, productName, fileType } = req.body;
      const ipfsNFTHash = await ipfsService.uploadToIPFS(file);

      if (ipfsNFTHash) {
        const document = {
          name: productName,
          description: productName,
          animation_url: ipfsNFTHash,
          image: ipfsNFTHash,
          external_url: process.env.EXTERNAL_URL,
          attributes: [
            {
              key: 'alt_text',
              trait_type: 'alt_text',
              value: productName,
            },
          ],
        };
        const ipfsJSONHash = await ipfsService.uploadJSONFileToIPFS(document);
        if (ipfsJSONHash) {
          const updatedObject = {
            product_updatedAt: Date.now(),
            nft_image: {
              imageHash: ipfsNFTHash,
              JSONHash: ipfsJSONHash,
              fileType: fileType,
            },
            product_stepperStatus: true,
          };
          request.post(
            process.env.SERVER_ROUTE,
            { json: { productID: productID, productObject: updatedObject } },
            (error, response, body) => {
              if (error) {
                console.log(error);
                return res.status(400).json({ success: false, error: error });
              }
              return res.status(200).json({ success: true, data: body.data });
            },
          );
        }
      } else {
        return res.status(400);
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error });
    }
  },

  // eslint-disable-next-line consistent-return
  uploadJSONFileToIPFS: async function (req, res) {
    try {
      const { productID, productName, ipfsNFTHash, fileType } = req.body;
      const document = {
        name: productName,
        description: productName,
        animation_url: ipfsNFTHash,
        image: ipfsNFTHash,
        external_url: process.env.EXTERNAL_URL,
        attributes: [
          {
            key: 'alt_text',
            trait_type: 'alt_text',
            value: productName,
          },
        ],
      };
      const ipfsJSONHash = await ipfsService.uploadJSONFileToIPFS(document);
      if (ipfsJSONHash) {
        const updatedObject = {
          product_updatedAt: Date.now(),
          nft_image: {
            imageHash: ipfsNFTHash,
            JSONHash: ipfsJSONHash,
            fileType: fileType,
          },
          product_stepperStatus: true,
        };
        request.post(
          process.env.SERVER_ROUTE,
          { json: { productID: productID, productObject: updatedObject } },
          (error, response, body) => {
            if (error) {
              console.log(error);
              return res.status(400).json({ success: false, error: error });
            }
            return res.status(200).json({ success: true, data: body.data, ipfsJSONHash: ipfsJSONHash });
          },
        );
      } else {
        return res.status(400);
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },
};

module.exports = ipfsController;
