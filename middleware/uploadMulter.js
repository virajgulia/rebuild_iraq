const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const getFileType = (file) => {

  if (file.mimetype.match('image'))
    return 'image';

  if (file.mimetype.match('video'))
    return 'video';

  if (file.mimetype.match('audio'))
    return 'audio';

  return 'other';
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let type_file = getFileType(file);
    let path = './public/uploads';
    if (type_file === 'image') {
      path = './public/uploads/image'
    } else if (type_file === 'audio') {
      path = './public/uploads/audios'
    } else if (type_file === 'video') {
      path = './public/uploads/videos'
    }else if (type_file === 'other') {
      path = './public/uploads/file'
    }
    cb(null, path)
  },
  filename: (req, file, cb) => {
    const filename = uuidv4();
    const arr = file.originalname.split('.');
    const ext = arr[arr.length - 1]
    cb(null, filename + '.' + ext);
    // cb(null, file.originalname);
  }
});

const uploadMulter = multer({ storage })

module.exports = uploadMulter;