import React, { Component } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import ContactInfo from '../../components/Contact/ContactInfo';
import ContactFormStyleTwo from '../../components/Contact/ContactFormStyleTwo';
import Footer from '../../components/Layouts/Footer';
import ControlHome from './controlHome';
import Link from 'next/link';
import { getTotalNews } from '../../redux/actions/news'
import Control from './controlPanel';
import UserProfile from '../../components/Profile/Profile'
import ControlProfile from './ControlProfile';
class controlPanelAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      controlHere: "My Account",
    }
  }
  render() {
    return (
      <React.Fragment>
        <Control props={this.state.controlHere} />
        <ControlProfile />
        <Footer />
      </React.Fragment>
    )
  }

}
export default controlPanelAccount;