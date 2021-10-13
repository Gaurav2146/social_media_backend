/* eslint-disable consistent-return */
const { InternalServerError } = require('http-errors');

const ipfsClient = require('ipfs-http-client');

const { globSource } = ipfsClient;

const ipfs = ipfsClient(process.env.IPFS_PATH);

const path = require('path');

const fs = require('fs');

class IpfsService {
  async uploadToIPFS(file) {
    if (file) {
      try {
        const filepath = path.join(__dirname, `../../${file.path}`);
        const fileadded = await ipfs.add(globSource(filepath, { recursive: true }));
        const hash = fileadded.cid.toString();
        return `https://ipfs.io/ipfs/${hash}`;
      } catch (err) {
        console.log('check----err.message---------------', err.message);
        throw new InternalServerError('File not uploaded to IPFS');
      }
    }
  }

  async uploadJSONFileToIPFS(document) {
    if (document) {
      try {
        const filepath = path.join('data.json');
        const fileadded = await ipfs.add(globSource(filepath, { recursive: true }));
        const hash = fileadded.cid.toString();
        return `https://ipfs.io/ipfs/${hash}`;
        // const parseJson = JSON.parse(JSON.stringify(document));
        // fs.writeFile('data.json', JSON.stringify(parseJson), (error) => {
        //   // if (error) throw error;
        //   // const JSONDocument = JSON.stringify(document);
        //   // const data = await ipfs.add(JSONDocument);
        //   // return data;
        // });
      } catch (err) {
        console.log('check----err.message---------------', err.message);
        throw new InternalServerError('File not uploaded to IPFS');
      }
    }
  }
}

module.exports = IpfsService;
