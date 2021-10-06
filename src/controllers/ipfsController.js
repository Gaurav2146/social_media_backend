
const { BadRequest, InternalServerError } = require('http-errors');
const isHttpError = require('http-errors');
const https = require('https')
const projectId = '1z5U6e17vOGlZCt3Te6KpfFuxVW'
const projectSecret = 'b81f455dedc260e5a1fb3f17510ec0be'

const ipfsController = {

  saveDataToIPFS: async function (reqest, response, next) {
    try {

      const options = {
        host: 'ipfs.infura.io',
        port: 5001,
        path: '/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn',
        method: 'POST',
        auth: projectId + ':' + projectSecret
      }
      // const fileadded = await ipfs.add(globSource(filepath, { recursive: true }));
      //     const hash = fileadded.cid.toString();
      //     console.log('hash1-------------', hash);
      //     uploadFile.push('https://ipfs.io/ipfs/' + hash);

      let req = https.request(options, (res) => {
        let body = ''
        res.on('data', function (chunk) {
          body += chunk                                                                                                  
        })                        
        res.on('end', function () {
          response.status(200).json({ data: body })                                          
        })
      })
      req.end();
    } catch (e) {
      if (isHttpError(e)) {
        next(e);
      } else {
        return res.status(400).json({ message: 'something went wrong!' });
      }
    }
  }
  
}

module.exports = ipfsController;