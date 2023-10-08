import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDb from "../../../../middleware/dbMiddleware";
const dotenv = require("dotenv").config();
const nextConnect = require("next-connect");
const Users = require("../../../../models/user");

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const { id } = req.query;
    const user = await Users.findOneAndUpdate(
      { _id: id },
      { $set: { isConfirmed: true } },
      (err, result) => {
        if (err) {
          console.log("err: ", err);
          res.status(400).json(err);
        }

        console.log("result: ", result);
        res.redirect(`${process.env.HOST_NAME}login`);
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

export default connectDb(handler);
