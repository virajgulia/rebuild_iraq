const dotenv = require("dotenv").config();
const aws = require("aws-sdk");
const s3 = new aws.S3();

aws.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const deleteFileS3 = async (arrFile) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: {
      Objects: arrFile,
      Quiet: false,
    },
  };
  await s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
  });
};

export default deleteFileS3;
