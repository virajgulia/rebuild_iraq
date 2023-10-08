import connectDb from "../../../middleware/dbMiddleware";
import Stripe from "stripe";
const nextConnect = require("next-connect");
const handler = nextConnect();
const checkAuth = require("../../../middleware/authentication");
const Users = require("../../../models/user");

const stripe = new Stripe(process.env.STRIPE_SECRET);

handler.use(checkAuth);
handler.post(async (req, res) => {
  const { paymentMethodID, planId, _id, planName } = req.body;
  // get user
  const { firstName, lastName, email } = await Users.findById(req.user.id).exec();

  // create customer
  const customer = await stripe.customers.create({
    email,
    name: `${firstName} ${lastName}`,
    // payment_method: paymentMethodID,
  });

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        price: planId,
      }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    // update user
    try {
      const id = req.user.id;
      const updates = {
        started: subscription.current_period_start,
        renew: subscription.current_period_end,
        customerId: customer.id,
        paid: true,
        subscriptionId: subscription.id,
        planName,
        plan: planId,
        paymentMethodId: paymentMethodID,
      };
      const result = await Users.findByIdAndUpdate(id, updates, { new: true });
      return res.send({
        status: "UPDATED",
        code: 200,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: "ERROR",
        code: 500,
        message: "Internal Server Error",
        error: err,
      });
    }
    // res.send({
    //   subscriptionId: subscription.id,
    //   clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    // });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }

  // subscription
  // const subscription = await stripe.subscriptions.create({
  //   customer: customer.id,
  //   items: [
  //     {
  //       price: planId,
  //     },
  //   ],
  //   default_payment_method: paymentMethodID?.toString(),
  // });

  // console.log("subscription1: ", subscription);

  // update user
  // const updateUser = await Users.findByIdAndUpdate(
  //   req.user.id,
  //   {
  //     started: subscription.current_period_start,
  //     renew: subscription.current_period_end,
  //     customerId: customer.id,
  //     paid: true,
  //     subscriptionId: subscription.id,
  //     planName,
  //     plan: planId,
  //     paymentMethodId: paymentMethodID,
  //   },
  //   { multi: true },
  //   (err, result) => {
  //     console.log("err: ", err);
  //     console.log("result: ", result);
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.status(200).json(result);
  //     }
  //   }
  // );

  // console.log("updateUser: ", updateUser);
  // res.status(200).json(updateUser);
});

export default connectDb(handler);
