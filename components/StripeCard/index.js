import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_KEY } from "../../common/index";
import { Button } from "@material-ui/core";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("1123123123");
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      // return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      // customer: props.customerID,
    });


    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // const updatePaymentMethod = await stripe.updatePaymentMethod(paymentMethod.id, {
      //   cus
      // })
      await props.onSetPaymentMethod(paymentMethod.id);
      await props.onSignup();
    }
  };

  const handleChangeCard = (event, card) => {
    console.log(event);
    console.log(card);
  };

  return (
    <form>
      <CardElement onChange={handleChangeCard} />
      <Button
        color="primary"
        fullWidth
        onClick={handleSubmit}
        type="button"
        variant="contained"
        disabled={!stripe}
        style={{ margin: "30px 0" }}
      >
        Pay
      </Button>
    </form>
  );
};

const stripePromise = loadStripe(STRIPE_KEY);
// const stripePromise = loadStripe('pk_test_UTm72fp6zGXnjWwVbGX9XFS0');

const StripeCheckoutForm = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        customerID={props.customerID}
        onSetPaymentMethod={props.onSetPaymentMethod}
        onClose={props.onClose}
        onSignup={props.onSignup}
      />
    </Elements>
  );
};

export default StripeCheckoutForm;
