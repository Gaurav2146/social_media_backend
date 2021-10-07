
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const https = require('https')
const projectId = '1z5U6e17vOGlZCt3Te6KpfFuxVW'
const projectSecret = 'b81f455dedc260e5a1fb3f17510ec0be'

var fs = require('fs');
var FormData = require('form-data');

const ipfsController = {


  saveDataToIPFS: async function (reqest, response, next) {
    let formData = new FormData();
    try {
      fs.readFile('/home/gaurav/Documents/FANCY/FANCY_BACKEND/api.fancy/public/Demo.txt', 'utf8', function (err, data) {
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
            'Content-Length': data1.length
          },
          auth: '1z5U6e17vOGlZCt3Te6KpfFuxVW' + ':' + 'b81f455dedc260e5a1fb3f17510ec0be'
        }
        let req = https.request(options, (res) => {
          let body = ''
          res.on('data', function (chunk) {
            body += chunk
          })
          res.on('end', function () {
            console.log("response body====", body)
          })
        })
        req.end();    
        response.status(200);
      });
    } catch (error) {
      response.status(400);
    }
  }
}


module.exports = ipfsController;