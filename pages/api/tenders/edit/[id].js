const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const Tender = require("../../../../models/tender")
const handler = nextConnect();
const bcrypt = require("bcrypt");
const saltRounds = 10;

handler.put(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const data = req.body;
    console.log(data,"req data");
    let crypt
    if(data.password){
      let salt=await bcrypt.genSalt(saltRounds)
      crypt=await bcrypt.hash(data.password,salt)
    data['password']=crypt
    }
if(data.password ===''){
    delete data['password']
}
    let tender = await Tender.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
      
      (err) => {
        if (err) throw err;
      }
    ).exec();
    return res.status(200).json(tender);
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});



export default connectDb(handler);
