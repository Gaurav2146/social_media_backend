const { BadRequest, InternalServerError } = require('http-errors');

const isHttpError = require('http-errors');

const https = require('https');

const request = require('request');

const projectId = '1z5U6e17vOGlZCt3Te6KpfFuxVW';

const projectSecret = 'b81f455dedc260e5a1fb3f17510ec0be';

const fs = require('fs');

const FormData = require('form-data');

const IPFSService = require('../services/ipfsService');

const ipfsService = new IPFSService();

const product = require('../model/product');

const ipfsController = {
  saveDataToIPFS: async function (reqest, response, next) {
    const formData = new FormData();
    try {
      fs.readFile('/home/gaurav/Documents/FANCY/FANCY_BACKEND/api.fancy/public/Demo.txt', 'utf8', (err, data) => {
        console.log(__dirname);
        if (err) {
          console.log(err);
          response.status(400);
        }
        formData.append('file', data);
        // formData.append('path', 'https://ipfs.infura.io/ipfs/Demo.txt');
        const data1 = JSON.stringify(formData);
        console.log(data);
        const options = {
          host: 'ipfs.infura.io',
          port: 5001,
          path: '/api/v0/add',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Length': data1.length,
          },
          auth: '1z5U6e17vOGlZCt3Te6KpfFuxVW' + ':' + 'b81f455dedc260e5a1fb3f17510ec0be',
        };
        const req = https.request(options, (res) => {
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('end', () => {
            console.log('response body====', body);
          });
        });
        req.end();
        response.status(200);
      });
    } catch (error) {
      response.status(400);
    }
  },
  saveDetailsToIPFS: async function (req, res, next) {
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
          external_url: 'http://fancy.lapits.com',
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
            ` http://api.fancy.lapits.com/product/updateProduct`,
            // ` http://localhost:3210/product/updateProduct`,
            { json: { productID: productID, productObject: updatedObject } },
            (error, response, body) => {
              if (error) {
                return res.status(400).json({ success: false, error: error });
              }
              return res.status(200).json({ success: true, data: body });
            },
          );
        }
      }
    } catch (error) {
      res.status(400);
    }
  },
};

module.exports = ipfsController;
