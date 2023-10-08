import React, { Component } from "react";
import Control from "./controlPanel";
import Footer from "../../components/Layouts/Footer";
class ControlHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlHere: "Help",
    };
  }
  render() {
    return (
      <React.Fragment>
        <Control props={this.state.controlHere} />
        <div className="container helpContainer">
          <h5 style={{ paddingTop: 15 }}>Help</h5>
          <hr />
          <h6>Control Panel</h6>
          <p>
            The Control panel is your launch point for managing your profile as
            well as configuring alerts for both Tenders and News alerts.
          </p>
          <br />
          <h6>My Account</h6>
          <p>
            Here is where you can view and/or edit your profile information as
            well as change your passsword.
          </p>
          <br />
          <h6>Alert Profile</h6>
          <p>
            On this page, you will find control boxes that will allow you to
            customize Tenders and News alerts including:
            <br />
            - Enabling/Disabling alerts
            <br />
            - Specifying which categories you wish to be notified about
            <br />- Specifying which locations you are interested in
          </p>
          <br />
          <h6>Tenders</h6>
          <p>
            On this page, you will find a listing of Tenders, pre-filtered based
            on customizations you selected in your Alert Profile for Tenders.
          </p>
          <br />
          <h6>News</h6>
          <p style={{ paddingBottom: 15 }}>
            On this page, you will find a listing of News Articles, pre-filtered
            based on customizations you selected in your Alert Profile for News.
          </p>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default ControlHelp;
