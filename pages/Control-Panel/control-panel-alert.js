import React, { Component } from "react";
import Footer from "../../components/Layouts/Footer";
import Control from "./controlPanel";
import Alert from "../../components/Controlpanel/Alert/Alert";
import AllListings from "../../components/TenderListings/AllListings";
class controlTender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlHere: "Alert Profile",
    };
  }
  render() {
    return (
      <React.Fragment>
        <Control props={this.state.controlHere} />
        <Alert />
        <Footer />
      </React.Fragment>
    );
  }
}
export default controlTender;
