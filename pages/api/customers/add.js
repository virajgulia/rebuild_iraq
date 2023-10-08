import connectDb from "../../../middleware/dbMiddleware";
import Stripe from "stripe";
const nextConnect = require("next-connect");
const handler = nextConnect();

const stripe = new Stripe(process.env.STRIPE_SECRET);

handler.post(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const customer = await stripe.customers.create({
    email,
    name: `${firstName} ${lastName}`,
  });
  console.log("customer: ", customer);
  res.status(200).json(customer);
});

export default connectDb(handler);
