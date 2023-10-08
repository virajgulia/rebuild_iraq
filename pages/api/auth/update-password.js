import connectDb from "../../../middleware/dbMiddleware";
const jwt = require("jsonwebtoken");
const sendMail = require("../../../middleware/sendMail");
const generator = require("generate-password");
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    console.log('====>',req.body);
    const { email, password } = req.body;
    console.log("email: ", email);

    const user = await Users.findOne({ email }).exec();

    if (user) {

        const newPassword = password;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          res.status(400).json(err);
        }
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) {
            res.status(400).json(err);
          }
          console.log("hash: ", hash);
          const updateUser = await Users.findOneAndUpdate(
            { _id: user.id },
            { $set: { password: hash } },
            async (err, result) => {
              if (err) {
                res.status(400).json(err);
              }
              console.log(result);

              
              res.status(200).json({
                status: "success",
                message: "Password updated successfully",
              });
            }
          );
        });
      });
    } else {
      console.log('====>failed');
      res.status(400).json({
        status: "failed",
        message: "Email does not exist.",
      });
    }
  } catch (error) {
    console.log("err: ", error);
    res.status(400).json(error);
  }
});

export default connectDb(handler);
