import React, { Component } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import ContactInfo from '../../components/Contact/ContactInfo';
import ContactFormStyleTwo from '../../components/Contact/ContactFormStyleTwo';
import Footer from '../../components/Layouts/Footer';
import ControlHome from './controlHome';
import Link from 'next/link';
import { getTotalNews } from '../../redux/actions/news'
class Control extends Component {

  render() {
    console.log('uu--', this.props.props)
    return (
      <React.Fragment>
        <Navbar />
        {/* <PageBanner 
                    pageTitle="Control Panel"
                    style={{height:0}}>
                </PageBanner> */}
        <>
          <h3 style={{ textAlign: "center", marginTop: 50, fontSize: 35 }}>Control Panel</h3>
          <div className='controlRouteContainer'>
            <ul className="controlPanelRoute">
              <li style={{color: '#007bff',textDecorationLine:'underline', fontWeight: '600'}}> CONTROL PANEL </li>
              <li style={{color: '#000',fontWeight: '600', textTransform: "uppercase"}} className='panelRouteLink'><span> &nbsp; / </span>{this.props.props}</li>
            </ul>
          </div>
          <div className='panelSidebar'>
            <ul className="navbar-nav panelBarList">
              <li className="nav-item panelBarItem">
                <Link legacyBehavior href="../Control-Panel/controlHome">
                  <a className="nav-link panelBarItems" style={{ color: "black" }}>Control Panel</a>
                </Link>
              </li>
              <li className="nav-item panelBarItem">
                <Link legacyBehavior href="../Control-Panel/controlPanelAccount">
                  <a className="nav-link panelBarItems" style={{ color: "black" }}>My Account</a>
                </Link>
              </li>

              <li className="nav-item panelBarItem">
                <Link legacyBehavior href="../Control-Panel/control-panel-alert">
                  <a className="nav-link panelBarItems" style={{ color: "black" }}>Alert Profile</a>
                </Link>
              </li>

              <li className="nav-item panelBarItem">
                <Link legacyBehavior href="../Control-Panel/ControlTender">
                  <a className="nav-link panelBarItems" style={{ color: "black" }}>Tenders</a>
                </Link>
              </li>

              <li className="nav-item panelBarItem">
                {/* <Link legacyBehavior href="/news"> */}
                <Link legacyBehavior href="../Control-Panel/ControlNews">
                  {/* <News/> */}
                  <a className="nav-link panelBarItems" style={{ color: "black" }}>News</a></Link>
                {/* </Link> */}
              </li>

              <li className="nav-item panelBarItem">
                <Link legacyBehavior href="../Control-Panel/ControlHelp">
                  <a className="nav-link panelBarItems" style={{ color: "black", paddingLeft: 5 }}>Help</a>
                </Link>
              </li>
            </ul>
          </div>
        </>


      </React.Fragment>
    );
  }
}

export default Control;