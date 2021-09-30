const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const awsS3Config = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const storage = multerS3({
  s3: awsS3Config,
  acl: 'public-read',
  bucket: process.env.AWS_BUCKET_NAME,
  s3BucketEndpoint: true,
  endpoint: `http://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
  metadata: function (req, file, cb) {
    cb(null, { files: file.fieldname });
  },
  key: function (req, file, cb) {
    const fileExtension = file.originalname.split('.')[1];
    const path = `${process.env.AWS_FOLDER + Math.floor(Date.now().toString() * Math.random())}.${fileExtension}`;
    cb(null, path);
  },
});

const upload = multer({
  storage: storage,
});

exports.fileUploader = async (req, res, next) => {
  const uploadImage = await upload.array('colorImages', 10);
  // eslint-disable-next-line consistent-return
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    if (err) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    next();
  });
};

exports.NFTfileUploader = async (req, res, next) => {
  const uploadImage = await upload.single('nft_image');
  // eslint-disable-next-line consistent-return
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    if (err) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    next();
  });
};
