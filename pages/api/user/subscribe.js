import jwt from "jsonwebtoken";

import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();
// handler.get(async (req, res) => {
//    return res.send(req.query)
// });


handler.get(async (req, res) => {
   
    console.log(req.query)
    console.log( process.env.secret)
    const token  = req.query.token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    req.userData = decoded;
    console.log(`reqdata ${req.userData.id}`)
    const user = await Users.findByIdAndUpdate(req.userData.id,
        {subscribe:req.query.subscribe},
         { new: true })
         .then((result) => {
             console.log(result)
        return res.send({
            status: "Created",
            code: 201,
            message: "user Updated Successfully",
            result1: req.query
        }); 
    }).catch((err)=>{
        console.log(`err : ${err}`)
    });
  });
 // ObjectId("5ff5ef914107b83ec1c8d566")
  export default connectDb(handler);