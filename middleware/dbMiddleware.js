import mongoose from 'mongoose';
const dotenv = require('dotenv').config();

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) return handler(req, res);
  mongoose.set("strictQuery", false);
 
  await mongoose.connect(process.env.MONGODB_URI).then((result) => {
    app.listen(PORT, () => {
      console.log("MONGODB CONNECTED");
      console.log(`Server Running on Port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err)); 
    
  //   {
  //   useNewUrlParser: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useUnifiedTopology: true,
    
    
  // },()=> console.log("db Connected"),)
  return handler(req, res);
}

export default connectDb;