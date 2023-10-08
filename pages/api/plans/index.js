import connectDb from "../../../middleware/dbMiddleware";
import Stripe from "stripe";
const nextConnect = require("next-connect");
const handler = nextConnect();

const stripe = new Stripe(process.env.LIVE_STRIPE_SECRET);

const plansName = [
  "CC Bronze Monthly",
  "CC Bronze Annual",
  "CC Silver Monthly",
  "CC Silver Annual",
  "CC Gold Monthly",
  "CC Gold Annual",
];

handler.get(async (req, res) => {

  const plans = await stripe.plans.list();
  console.log(plans,"plan::::::::")
  const newPlans = [];
  for (let i = 0; i < plans.data.length; i++) {
    const el = plans.data[i];
    if (plansName.indexOf(el.name) > -1) {
      newPlans.push(el);
    }
  }

  console.log("newPlans",newPlans)
  res.status(200).json(newPlans);
});

export default connectDb(handler);
