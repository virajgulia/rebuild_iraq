import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import FormField from "./FormField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import CircularProgress from "@material-ui/core/CircularProgress";
import StripeCardForm from "../StripeCard/index";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
// notification
import { toast, ToastContainer } from "react-toastify";
// actions
import { register } from "../../redux/actions/auth";
import { getAllPlans } from "../../redux/actions/plans";
import { createCustomerStripe } from "../../redux/actions/user";
import StripeCheckout from "react-stripe-checkout";

import CheckboxTree from 'react-checkbox-tree';
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { getAllCategories } from "../../redux/actions/category";
class JoinForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      firstNameVal: "",
      lastNameVal: "",
      emailVal: "",
      passwordVal: "",
      termsConditions: false,
      errors: [],
      loading: false,
      planId: "free",
      isShowCard: false,
      paymentMethodID: null,
      nodes: [
        {
          value: 'all',
          label: 'All Tenders Categories',
          children: [],
        }
      ],

      planAmount: null,
      planName: null,
      // < --------- Test Code End-------->
      checked: [],
      expanded: [],

    };
    this.setError = this.setError.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  newGate() {
    const { categories } = this.props;
    console.log('working', categories);
    const treeData = [
      {
        value: 'all',
        label: 'All Tenders Categories',
        children: [],
      }
    ];
    for (let i = 0; i < categories.length; i++) {
      const item = categories[i];
      const ob = {
        value: item._id,
        label: item.title,
      };
      treeData[0].children.push(ob);
    };
    console.log('----->', treeData);
    console.log('===>', this.state.nodes);
    this.setState({ nodes: treeData })

  }
  handleCheckboxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  componentDidMount = async () => {
    await this.props.getAllCategories();
    await this.props.getAllPlans();
    await this.newGate();
  };

  setError = (errors) => {
    this.setState({ errors });
  };

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = (field) => {
    this.setState({ [field]: this.state.errors.length === 0 });
  };

  valueStateChanged = (field) => {
    // this.setState({ [field]: this.state.value });
  };

  // state change watch functions for each field
  emailChanged = (values) => {
    this.setState({
      email: values.errors.length === 0 ? true : false,
      emailVal: values.value,
    });
  };

  firstNameChanged = (values) => {
    this.setState({
      firstName: values.errors.length === 0 ? true : false,
      firstNameVal: values.value,
    });
  };

  lastNameChanged = (values) => {
    this.setState({
      lastName: values.errors.length === 0 ? true : false,
      lastNameVal: values.value,
    });
  };

  passwordChanged = (values) => {
    // console.log(this.props.categories);
    // console.log(this.props);
    this.setState({
      password: values.errors.length === 0 ? true : false,
      passwordVal: values.value,
    });
  };

  handleSetPaymentMethod = (paymentMethodID) => {
    this.setState({ paymentMethodID });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    const { planId } = this.state;

    console.log(this.state.checked);
    if (planId === "free") {
      this.setState({ planName: "Free Trial" });
      this.onSignup();
    }
  };

  onSignup = async () => {
    const {
      firstNameVal,
      lastNameVal,
      emailVal,
      passwordVal,
      planId,
      planName,
      planAmount,
      paymentMethodID,
      checked,
    } = this.state;

    await this.props.register({
      email: emailVal,
      firstName: firstNameVal,
      lastName: lastNameVal,
      password: passwordVal,
      tenderCategories: checked,
      planId,
      planName: planId === "free" ? "Free Trial" : planName,
      paymentMethodId: paymentMethodID,
    });

    if (this.props.isRegister) {
      console.log("khgkmjkjm")
      this.setState({ loading: false });
      toast.success("Register successfully!");
      Router.push("/login");
    } else {
      console.log("khgkmjkjmfghthgtjrhgyjt")

      this.setState({ loading: false });
      toast.error("Email already exists!");
    }
  };

  handleChangePlan = (event) => {
    console.log("id: ", event.target.value);
    const planId = event.target.value;
    const { plans } = this.props;
    const plan = plans.filter((el) => el.id === planId);
    // console.log('---->',plan);
    if (plan.length > 0) {
      // console.log('newGate',plan[0].amount);
      this.setState({ planAmount: plan[0].amount })
      this.setState({ planName: plan[0].id });
      console.log('newGate1', this.state.planAmount)
      console.log('newGate2', this.state.planName)
      // console.log('plan amount===>',plan.amount);
    }
    this.setState({ planId });
    if (planId !== "free") {
      this.setState({ isShowCard: true, loading: false });
    } else {
      this.setState({ isShowCard: false, loading: false });

    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      loading,
      isShowCard,
      termsConditions,
      nodes,
    } = this.state;
    const formValidated = firstName && lastName && email && password && termsConditions;

    const { plans } = this.props;

    // validation function for the firstName
    // ensures that firstName contains at least two names separated with a space
    const validateFirstName = (value) => {
      const regex = /^[a-z ,.'-]{2,26}$/i;
      if (!regex.test(value)) throw new Error("First Name is invalid");
    };

    const validateLastName = (value) => {
      const regex = /^[a-z ,.'-]{2,26}$/i;
      if (!regex.test(value)) throw new Error("Last Name is invalid");
    };


    const handleCheckoutt = (paymentInfo) => {
      console.log(paymentInfo);
    };
    return (
      <section className="user-area-all-style log-in-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="contact-form-action">
              <form
                // onSubmit={(e) => this.onSubmit(e)}
                noValidate
              >
                <div className="form-heading text-center">
                  <h3 className="form-title">Sign Up</h3>
                </div>

                <div className="py-5 border-gray border-top border-bottom">
                  {/** Render the firstName form field passing the name validation fn **/}
                  <FormField
                    type="text"
                    fieldId="firstName"
                    label="First Name"
                    placeholder="Enter First Name"
                    validator={validateFirstName}
                    onStateChanged={this.firstNameChanged}
                    setError={this.setError}
                    required
                  />

                  <FormField
                    type="text"
                    fieldId="lastName"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    validator={validateLastName}
                    onStateChanged={this.lastNameChanged}
                    setError={this.setError}
                    required
                  />

                  {/** Render the email field component **/}
                  <EmailField
                    fieldId="email"
                    label="Email"
                    placeholder="Enter Email Address"
                    onStateChanged={this.emailChanged}
                    required
                  />

                  {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
                  <PasswordField
                    fieldId="password"
                    label="Password"
                    placeholder="Enter Password"
                    onStateChanged={this.passwordChanged}
                    thresholdLength={7}
                    required
                  />

                  <div style={{ padding: 16 }}>
                    <label className="control-label">Select Your Plan</label>
                    <select
                      style={{
                        padding: 15,
                        width: "100%",
                        fontSize: "15px",
                        backgroundColor: "#f7f7f",
                      }}
                      onChange={this.handleChangePlan}
                      value={this.state.planId}
                    >
                      <option value="free">Free Trial - 48hr Access</option>
                      {plans &&
                        plans.length > 0 &&
                        plans.map((plan, i) => (
                          <option key={i} value={plan.id}>
                            {plan.name + " - $" + plan.amount.toString().slice(0, -2) + "/" + plan.interval}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div style={{ padding: 16 }}>
                    <CheckboxTree
                      icons={{
                        check: <span className="rct-icon rct-icon-check" />,
                        uncheck: <span className="rct-icon rct-icon-check" />,
                        halfCheck: <span className="rct-icon rct-icon-check" />,
                        expandClose: (
                          <span className="rct-icon rct-icon-expand-close" />
                        ),
                        expandOpen: (
                          <span className="rct-icon rct-icon-expand-open" />
                        ),
                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                        collapseAll: (
                          <span className="rct-icon rct-icon-collapse-all" />
                        ),
                        parentClose: null,
                        parentOpen: null,
                        leaf: null,
                      }}
                      nodes={this.state.nodes}
                      checked={this.state.checked}
                      expanded={this.state.expanded}
                      onCheck={checked => this.setState({ checked })}
                      onExpand={expanded => this.setState({ expanded })}
                    />
                  </div>
                  <div
                    style={{
                      padding: "0px 15px",
                      display: "flex",
                      alignItems: "baseline",
                    }}
                  >
                    <input
                      style={{ marginRight: 10 }}
                      name="termsConditions"
                      type="checkbox"
                      checked={this.state.termsConditions}
                      onChange={this.handleCheckboxChange}
                    />

                    <p>
                      I have read{" "}
                      <a href="/terms-and-conditions" target="_blank">
                        terms and conditions.
                      </a>
                    </p>
                  </div>

                  <br />

                  {/** Show the form button only if all fields are valid **/}
                  <div style={{ position: "relative" }}>
                    {isShowCard ? <StripeCheckout
                      name="Rebuilding Iraq"
                      price={this.state.planAmount}
                      currency="USD"
                      billingAddress={true}
                      // billingAddress={true}
                      shippingAddress={true}
                      zipCode={true}

                      stripeKey= "sk_live_B42xfaD1xoqCSXTc8mnDBmSS"
                      token={(paymentInfo) => handleCheckoutt(paymentInfo)}
                    ><button
                      // type={this.state.planId === 'free' ? 'submit' : 'button'}
                      type="button"
                      className={`default-btn btn-two ${formValidated && !loading ? "" : "disabled-button"
                        }`}
                      disabled={formValidated && !loading ? false : true}
                      onClick={this.onSubmit}
                    >
                        Sign Up
                      </button></StripeCheckout> : <button
                        // type={this.state.planId === 'free' ? 'submit' : 'button'}
                        type="button"
                        className={`default-btn btn-two ${formValidated && !loading ? "" : "disabled-button"
                          }`}
                        disabled={formValidated && !loading ? false : true}
                        onClick={this.onSubmit}
                      >
                      Sign Up
                    </button>}
                    {loading && (
                      <CircularProgress size={25} style={{ zIndex: 10 }} />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    );
  }
}

const mapStateToProps = (store) => {
  console.log("store in sign up", store)
  return {
    isRegister: store.auth.isRegister,
    msgErr: store.auth.msgErr,
    // plans
    plans: store.plans.plans,
    categories: store.category.categories,
    // user
    customer: store.user.customer,
  };
};

const mapDispatchToProps = {
  register,
  getAllCategories,
  getAllPlans,
  createCustomerStripe,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
