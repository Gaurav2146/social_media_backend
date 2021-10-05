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
  params.Delete = { Objects: deleteFiles, Quiet: false };
  await awsS3Config.deleteObjects(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } // an error occurred
    else {
      console.log('data', data);
      return data;
    } // successful response
  });
};
