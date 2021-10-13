/* eslint-disable consistent-return */
const aws = require('aws-sdk');

const awsS3Config = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
};

exports.deleteSelectedFiles = async (deleteFiles) => {
  console.log('deleteFiles', deleteFiles);
  if (deleteFiles && deleteFiles.length > 0) {
    params.Delete = { Objects: deleteFiles, Quiet: false };
    await awsS3Config.deleteObjects(params, (err, data) => {
      // eslint-disable-next-line no-empty
      if (err) {
        console.log(err);
      } // an error occurred
      else {
        console.log('data', data);
        return data;
      } // successful response
    });
  }
};
