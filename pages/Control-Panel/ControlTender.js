import React, { Component } from 'react';
import Footer from '../../components/Layouts/Footer';
import ControlHome from './controlHome';
import Control from './controlPanel';
import UserTender from '../../components/Controlpanel/Alert/userTender';
// import AllListings from '../../components/TenderListings/AllListings';
class controlTender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      controlHere: "Tenders",
    }
  }
  render() {
    return (
      <React.Fragment>
        <Control  props={this.state.controlHere} />
        <UserTender />
        <Footer />
      </React.Fragment>
    )
  }

}
export default controlTender;