import React, { Component } from "react";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";

class RequiredPlan extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="required-user">
          <div className="container user-register-alert">
            <div className="trial-expired">
              <h3>
                Your trial plan has expired. Please subscribe to a paid plan to
                continue.
              </h3>
              <br />
              <a
                style={{ marginTop: 35 }}
                className="default-btn"
                href="/pricing"
              >
                Select plan now
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default RequiredPlan;
