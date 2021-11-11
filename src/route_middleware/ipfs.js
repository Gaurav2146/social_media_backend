/* eslint-disable no-else-return */
const shell = require('shelljs');

const fs = require('fs');

const multer = require('multer');

// multer configuration for profile

const storagePicture = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./public/uploadNFTImages`;

    if (!fs.existsSync(dir)) {
      shell.mkdir('-p', dir);
    }

    cb(null, dir); // where to store it
  },

  filename: function (req, file, cb) {
    if (file.fileSize) {
      return cb(new Error());
    }
    if (!file.originalname.toLowerCase().match(/\.(png|jpg|svg|gif|mp4|webm|mp3|wav|ogg)$/)) {
      const err = new Error();

      err.code = 'filetype'; // to check on file type

      return cb(err, null);
    }

    const name = file.originalname.toLowerCase();

    const ext = name.substr(file.originalname.lastIndexOf('.') + 1);

    const rename = `${Date.now()}.${ext}`;

    return cb(null, rename);
  },
});

// multer configuration for bundle files

const upload = multer({
  storage: storagePicture,
  limits: {
    fileSize: 1024 * 1024 * 40, // we are allowing only 40 MB files
  },
  abortOnLimit: true,
}).any();

const pictureUpload = async (req, res, next) => {
  // req.setTimeout(60 * 60 * 1000);

  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'filetype') {
        return res.status(400).json({
          msg: 'File type is invalid. Only accepted .png/.jpg/.svg/.gif/.mp4/.webm/.mp3/.wav/.ogg .',
        });
      } else if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          msg: 'File should be less then 40MB .',
        });
      } else {
        console.error(err);
        return res.status(400).json({
          msg: 'File was not able to be uploaded',
        });
      }
    } else {
      next();
    }
  });
};

module.exports = {
  pictureUpload,
};
