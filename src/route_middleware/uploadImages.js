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
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.jfif' && ext !== '.gif') {
    const err = new Error();
    err.code = 'filetype'; // to check on file type
    return cb(err, null);
  }
  cb(null, true);
};

const fileFilterForNFT = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  ext = String(ext).toLowerCase();
  if (
    ext !== '.png' &&
    ext !== '.jpg' &&
    ext !== '.svg' &&
    ext !== '.svg' &&
    ext !== '.gif' &&
    ext !== '.mp4' &&
    ext !== '.webm' &&
    ext !== '.mp3' &&
    ext !== '.wav' &&
    ext !== '.ogg'
  ) {
    return cb(new Error('Invalid file format!'));
  }
  return cb(null, true);
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
  fileFilter: fileFilterForNFT,
  storage: nftStorage,
  limits: {
    fileSize: 1024 * 1024 * 40, // we are allowing only 40 MB files
  },
  abortOnLimit: true,
});

exports.fileUploader = async (req, res, next) => {
  const uploadImage = await upload.array('productImages', 20);
  // eslint-disable-next-line consistent-return
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: err, type: 'multer error' });
    }
    if (err) {
      if (err.code === 'filetype') {
        return res.status(400).json({
          msg: 'File type is invalid. Only accepted .png/.jpg/.svg/.gif/.jpeg',
        });
      }
    }
    next();
  });
};

exports.nftFileUploader = async (req, res, next) => {
  const uploadNFTImage = await nftUpload.single('nft_image');
  // eslint-disable-next-line consistent-return
  uploadNFTImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: err.code, type: 'multer error' });
    }
    if (err) {
      return res.status(400).json({ success: false, error: err.code, type: 'multer error' });
    }
    next();
  });
};
