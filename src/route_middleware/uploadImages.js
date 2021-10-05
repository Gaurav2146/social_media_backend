const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const awsS3Config = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// eslint-disable-next-line consistent-return
const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  ext = String(ext).toLowerCase();
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.jfif') {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
};

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
    const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
    const filePath = `${process.env.AWS_FOLDER + Math.floor(Date.now().toString() * Math.random())}.${fileExtension}`;
    cb(null, filePath);
  },
});

const nftStorage = multerS3({
  s3: awsS3Config,
  acl: 'public-read',
  bucket: process.env.AWS_BUCKET_NAME,
  s3BucketEndpoint: true,
  endpoint: `http://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com`,
  metadata: function (req, file, cb) {
    cb(null, { files: file.fieldname });
  },
  key: function (req, file, cb) {
    const fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
    const filePath = `${process.env.AWS_FOLDER_NFT_IMAGE + Math.floor(Date.now().toString() * Math.random())}.${fileExtension}`;
    cb(null, filePath);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const nftUpload = multer({
  storage: nftStorage,
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

exports.nftFileUploader = async (req, res, next) => {
  const uploadNFTImage = await nftUpload.single('nft_image');
  // eslint-disable-next-line consistent-return
  uploadNFTImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    if (err) {
      return res.status(400).json({ success: false, msg: err.message, type: 'multer error' });
    }
    next();
  });
};
