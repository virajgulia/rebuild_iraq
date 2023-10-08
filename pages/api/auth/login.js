import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDb from "../../../middleware/dbMiddleware";
const dotenv = require("dotenv").config();
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();

handler.post(async (req, res) => {
  // try {
  const { email, password } = req.body;
  console.log(req.body);
  let user = await Users.findOne({ email }).exec();
  let isAdmin = user && user.isAdmin;
  let tempPass = user && user.tempPass;

  if (user) {
    let checked = await bcrypt
      .compare(password, user.password)
      .then(async (checked) => {
        console.log("checked: ", checked);
        // create token
        if (checked) {
          let token = await jwt.sign(
            {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
            },
            process.env.secret,
            { expiresIn: "7d" }
          );
          res.json({
            success: true,
            _id: user._id,
            token: "JWT " + token,
            isAdmin: isAdmin,
            msg: "Login successfully!",
            firstName: user.firstName,
            tempPass: tempPass,
          });
        } else {
          res.status(401).json({ msg: "Email or password incorrect!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({ msg: "Check password failed!" });
      });
  } else {
    res.status(401).send({
      success: false,
      msg: "Authentication failed. Users not found.",
    });
  }
  // } catch (error) {
  //   res.status(400).json({ msg: "Connect db failed!" });
  // }
});

export default connectDb(handler);
