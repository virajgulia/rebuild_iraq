import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();
const checkAuth = require("../../../middleware/authentication");
const bcrypt = require("bcrypt");
const saltRounds = 10;
handler.use(checkAuth);

handler.put(async (req, res) => {
  const { oldPassword, password } = req.body;
  const user = await Users.findById(req.user.id);

  // check oldpassword
  let checked = await bcrypt
    .compare(oldPassword, user.password)
    .then(async (checked) => {
      console.log("checked: ", checked);
      // create token
      if (checked) {
        // has new password and save
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) {
            res.status(400).json(err);
          }
          bcrypt.hash(password, salt, async (err, hash) => {
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

                res.status(200).json(result);
              }
            );
          });
        });
      } else {
        console.log('old pass incorrect')
        // res.status(401).json({ msg: "Old password incorrect!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "Check password failed!" });
    });
});

export default connectDb(handler);
