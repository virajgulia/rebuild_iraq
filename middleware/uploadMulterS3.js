const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
});

const getFileType = (file) => {
  if (file.mimetype.match("image")) return "image";
  if (file.mimetype.match("video")) return "video";
  if (file.mimetype.match("audio")) return "audio";
  if (file.mimetype.match("application")) return "file";
  return "other";
};

const uploadMulterS3 = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      metadata: function (req, file, cb) {
          cb(null, { originalname: file.originalname });
      },
      cacheControl: 'max-age=1296000',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      contentDisposition: 'inline',
      key: function (req, file, cb) {
          const filename = uuidv4();
          const arr = file.originalname.split('.');
          const ext = arr[arr.length - 1]

          let type_file = getFileType(file);
          let path = 'upload/images/'
          if (type_file === 'image') {
              path = 'upload/images/'
          } else if (type_file === 'file') {
              path = 'upload/files/'
          }

          cb(null, path + filename + '.' + ext)
      }
  })
})

export default uploadMulterS3;