const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const Users = require("../../../../models/user");
const handler = nextConnect();
const bcrypt = require("bcrypt");
const saltRounds = 10;

handler.put(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const data = req.body;
    let crypt
    if(data.password){
      let salt=await bcrypt.genSalt(saltRounds)
      crypt=await bcrypt.hash(data.password,salt)
    data['password']=crypt
    }
if(data.password ===''){
    delete data['password']
}
    let user = await Users.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
      
      (err) => {
        if (err) throw err;
      }
    ).exec();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error,"error");
    res.status(401).json({ msg: error });
  }
});



export default connectDb(handler);
