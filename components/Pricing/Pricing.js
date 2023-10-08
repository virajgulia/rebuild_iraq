import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";

import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import StripeCardForm from "../StripeCard/index";
import { toast, ToastContainer } from "react-toastify";

// actions
import { getAllPlans } from "../../redux/actions/plans";
import { subscriptionPlan } from "../../redux/actions/subscription";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class PricingStyleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCard: false,
      planId: null,
      paymentMethodID: null,
      planName: null,
    };
  }

  componentDidMount = async () => {
    this.props.getAllPlans();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.subscription !== this.props.subscription) {
      toast.success("Subscription plan successfully!");
      Router.push("/profile");
    }
    if (prevProps.msgErrorSub !== this.props.msgErrorSub) {
      toast.error("Subscription plan failed");
    }
  };

  openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    evt.currentTarget.className += "current";
  };

  handleSelectPlan = (name) => {
    console.log("nmae: ", name);
    const { plans } = this.props;
    console.log("plans: ", plans);

    const plan = plans.filter((el) => el.name === name);
    console.log("plan: ", plan);
    this.setState({ planName: plan[0]?.name });
    if (plan.length > 0) {
      this.setState({ planId: plan[0]?.id });
    }
    this.setState({ isShowCard: true });
  };

  onCheckout = async () => {
    console.log("values: ", this.state);
    const { planId, paymentMethodID, planName } = this.state;
    await this.props.subscriptionPlan({ planId, paymentMethodID, planName });
    await this.setState({ isShowCard: false });
  };

  handleSetPaymentMethod = (paymentMethodID) => {
    this.setState({ paymentMethodID });
  };

  handleClose = () => {
    this.setState({ isShowCard: false });
  };

  handleCheckout = (paymentInfo) => {
    console.log(paymentInfo)

    let userId = localStorage.getItem('id')
    console.log(userId)

    const url = `https://rebulding-iraq.vercel.app/api/user/edit/${userId}`;
    // const url = `http://localhost:3000/api/user/edit/${userId}`;


    let num = paymentInfo.plan == 'monthly' ? 1 : 12
    let rr = Math.floor(new Date(new Date(new Date().setMonth(new Date().getMonth() + num)).getTime() / 1000))
    // console.log(rr)

    let data = {
      paid: true,
      plan: paymentInfo.plan,
      planName: paymentInfo.type,
      startPlan: new Date().toString(),
      renew: rr
    }
    console.log(data)

    axios
      .put(url, data)
      .then((res) => {
        // router.push('/dash')
        console.log(res.data)
      })
      .catch((err) => console.log(err));





  }

  render() {
    const { plans } = this.props;
    const { isShowCard } = this.state;

    return (
      <section className="pricing-area pt-100 pb-70">
        <div className="container subscription-plans">
          <div className="section-title">
            <h3>Sign Up Today and Never Miss a Tender</h3>
            <span>_______</span>
          </div>

          <div className="tab quote-list-tab">
            {/* Tabs */}
            <ul className="tabs">
              <li
                className="current"
                onClick={(e) => this.openTabSection(e, "tab1")}
              >
                <span>Monthly</span>
              </li>

              <li onClick={(e) => this.openTabSection(e, "tab2")}>
                <span>Yearly</span>
              </li>
            </ul>

            <div className="tab_content">
              <div id="tab1" className="tabs_item">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Bronze</h3>
                      </div>
                      <span>
                        $99<sub>/month</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>One registered user
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Daily Alert Service to your inbox
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Access to all tenders
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay annually and save $438
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, type: 'bronze', plan: 'monthly', price: '$99' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/7sI3cMcgl66W2e4eUX' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Silver</h3>
                      </div>
                      <span>
                        $199<sub>/month</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>Two registered users
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          One month advert on home page
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Publish your company catalogue
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay anually and save $888
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, type: 'silver', plan: 'monthly', price: '$199' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/dR614E3JP52ScSI004' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Silver Monthly")
                        }
                      >
                        Get Started
                      </a> */}

                      <strong className="popular">Popular</strong>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Gold</h3>
                      </div>
                      <span>
                        $399<sub>/month</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>
                          Multiple registered users
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Tendr Alert and Marketing Services
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Advertising and Business Development
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay anually and save $1038
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, plan: 'monthly', price: '$399', type: 'gold' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/6oE8x61BHdzof0QbIN' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                      {/* <a
                        className="default-btn"
                        onClick={() => this.handleSelectPlan("CC Gold Monthly")}
                      >
                        Get Started
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>

              <div id="tab2" className="tabs_item">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Basic</h3>
                      </div>
                      <span>
                        $750<sub>/y</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>
                          One registered user
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Daily Alert Service to your inbox
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Access to all tenders
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay anually and save $438
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, type: 'basic', plan: 'yearly', price: '$750' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/9AQ14E2FLdzo4mc5km' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Annual")
                        }
                      >
                        Get Started
                      </a> */}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Silver</h3>
                      </div>
                      <span>
                        $1500<sub>/y</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>
                          Two registered users
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          One month advert on home page
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Publish your company catalogue
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay anually and save $888
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, type: 'silver', plan: 'yearly', price: '$1500' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/dR6cNm4NTeDs1a09AB' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Silver Annual")
                        }
                      >
                        Get Started
                      </a> */}

                      <strong className="popular">Popular</strong>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                    <div className="single-pricing">
                      <div className="pricing-top-heading">
                        <h3>Gold</h3>
                      </div>
                      <span>
                        $3750<sub>/y</sub>
                      </span>
                      <hr></hr>

                      <ul>
                        <li>
                          <i className="bx bx-check"></i>
                          Multiple registered users
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Tendr Alert and Marketing Services
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Advertising and Business Development
                        </li>
                        <li>
                          <i className="bx bx-check"></i>
                          Pay anually and save $1038
                        </li>
                      </ul>
                      {/* <StripeCheckout
                        name="Rebuilding Iraq"
                        price="99"
                        currency="USD"
                        billingAddress={true}
                        // billingAddress= {true}
                        shippingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_UTm72fp6zGXnjWwVbGX9XFS0"
                        token={(paymentInfo) => this.handleCheckout({ ...paymentInfo, type: 'gold', plan: 'yearly', price: '$3750' })}
                      > */}
                      {/* <a
                        className="default-btn"
                        onClick={() =>
                          this.handleSelectPlan("CC Bronze Monthly")
                        }
                      >
                        Get Started
                      </a> */}
                      <a href='https://buy.stripe.com/28obJibchcvk2e4cMM' target="_blank">

                        <button className="default-btn mt-5">
                          Get Started
                        </button>
                      </a>
                      {/* </StripeCheckout> */}
                      {/* <a
                        className="default-btn"
                        onClick={() => this.handleSelectPlan("CC Gold Annual")}
                      >
                        Get Started
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={isShowCard}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Card Info</DialogTitle>
          <DialogContent style={{ minWidth: 500 }}>
            <StripeCardForm
              onSetPaymentMethod={this.handleSetPaymentMethod}
              onClose={this.handleClose}
              onSignup={this.onCheckout}
            />
          </DialogContent>
        </Dialog>

        <ToastContainer />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  console.log("store", store);
  return {
    plans: store.plans.plans,
    subscription: store.subscriptions.subscription,
    msgErrorSub: store.subscriptions.msgError,
  };
};

const mapDispatchToProps = {
  getAllPlans,
  subscriptionPlan,
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingStyleOne);
