import React, { useState, useEffect } from "react";
import Navbar from "../components/Layouts/Navbar";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

import { connect } from "react-redux";
import { resetPassword, resetData } from "../redux/actions/auth";

const RecoverPassword = (props) => {
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (props.isResetPassword) {
      // dont remove ok function 
      const ok = async () => {
        await toast.success("Please check your email.");
        await props.resetData();

      }
      ok()
      router.push("/login");
    }
    if (props.msgErr) {
      toast.error(props.msgErr.message);
    }
  }, [props.msgErr, props.isResetPassword]);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    console.log("email: ", email);
    await props.resetPassword(email);
  };

  console.log(props);

  return (
    <React.Fragment>
      <Navbar />

      <ToastContainer />

      <section className="user-area-all-style recover-password-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact-form-action">
                <div className="form-heading text-center">
                  <h3 className="form-title">Reset Password!</h3>

                  <p className="reset-desc">
                    Enter the email of your account to reset the password. Then
                    you will receive a link to email to reset the password. If
                    you have any issue about reset password{" "}
                    <Link legacyBehavior href="/contact">
                      <a>contact us.</a>
                    </Link>
                  </p>
                </div>

                <form>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          placeholder="Enter Email Address"
                          onChange={handleChangeEmail}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <Link legacyBehavior href="/login">
                        <a className="now-log-in font-q">Log In</a>
                      </Link>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <p className="now-register">
                        Not a member? &nbsp;
                        <Link legacyBehavior href="/sign-up">
                          <a className="font-q">Register</a>
                        </Link>
                      </p>
                    </div>

                    <div className="col-12">
                      <button
                        className="default-btn btn-two"
                        disabled={email === ""}
                        type="button"
                        onClick={handleSubmit}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (store) => {
  return {
    isResetPassword: store.auth.isResetPassword,
    msgErr: store.auth.msgErr,
  };
};

const mapDispatchToProps = {
  resetPassword,
  resetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
