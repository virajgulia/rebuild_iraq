// import React, { Component } from "react";
// import Navbar from "../components/Layouts/Navbar";
// import PageBanner from "../components/Common/PageBanner";
// import Footer from "../components/Layouts/Footer";
// import Router from "next/router";
// import { connect } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";

// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import { connect } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteNews, getAllNews, getNews } from "../../redux/actions/news";
// import ActiveListings from "../components/Dashboard/ActiveListings";
// import StepperAddListing from "../components/Dashboard/StepperAddListing";
// import UserManagement from "../components/Dashboard/UserManagement";
// import NewsManagement from "../components/Dashboard/NewsManagement";
// import PodcastsManagement from "../components/Dashboard/PodcastsManagement";
// import GlossaryManagement from "../components/Dashboard/GlossaryManagement";
// import HeadPage from "../components/HeadPage/HeadPage";

// // import {
// //   Typography,
// //   Slide,
// //   Dialog,
// //   AppBar,
// //   Toolbar,
// //   IconButton,
// // } from "@material-ui/core";
// // import Box from "@material-ui/core/Box";
// // import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// // import 'react-tabs/style/react-tabs.css';
// //   import ActiveListings from "../../components/Dashboard/ActiveListings";
// //   import StepperAddListing from "../../components/Dashboard/StepperAddListing";
// //   import UserManagement from "../../components/Dashboard/UserManagement";
// //   import NewsManagement from "../../components/Dashboard/NewsManagement";
// //   import ControlPanel from "../../components/Dashboard/ControlPanel";
// //   import CloseIcon from "@material-ui/icons/Close";
// // //   import ActionNews from "../../components/Dashboard/ActionNews";
// // import { deleteNews, getAllNews, getNews } from "../../redux/actions/news";
// // import { deleteNews, getAllNews, getNews } from "../redux/actions/news";
// export default class Fhy extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tabIndex: 1,
//     };
//   }

//   //   state = {
//   //     isAdmin: false,
//   //     isPublisher: false,
//   //   };
//   //   componentDidMount = () => {
//   //     if (
//   //       localStorage.getItem("isAdmin") &&
//   //       localStorage.getItem("isPublisher")
//   //     ) {
//   //       this.setState({ isAdmin: localStorage.getItem("isAdmin") });
//   //       this.setState({ isPublisher: localStorage.getItem("isPublisher") });
//   //       if (
//   //         localStorage.getItem("isAdmin") === "false" &&
//   //         localStorage.getItem("isPublisher") === "false"
//   //       ) {
//   //         Router.push("/investment-opportunities");
//   //       } else {
//   //         if (typeof window !== "undefined") {
//   //           this.setState({ fullName: localStorage.getItem("fullName") });
//   //         }
//   //       }
//   //     } else {
//   //       Router.push("/login");
//   //     }
//   //   };
//   render() {
//     // const { isAdmin, isPublisher } = this.state;
//     return (
//       <React.Fragment>
//         <Navbar />
//         {/* <HeadPage title='Dashboard' /> */}
//         <PageBanner
//           pageTitle="Admin Dashboard"
//           homePageUrl="/"
//           homePageText="Home"
//           activePageText="Login"
//         />
//         <div>
//           <section className="user-area-all-style">
//             <div className="container">
//               <div className="dashboard-greeting">
//                 <h4>
//                   Hello {this.state.fullName ? this.state.fullName : "admin"}
//                 </h4>
//               </div>

//               <div className="dashboard">
//                 {true && (
//                   <Tabs
//                     selectedIndex={this.state.tabIndex}
//                     onSelect={(tabIndex) => this.setState({ tabIndex })}
//                   >
//                     <TabList className="listing-content-tabs">
//                       <Tab>Add Tender</Tab>
//                       <Tab>List All Tenders</Tab>
//                       <Tab>Tender Categories</Tab>
//                       <Tab>Tender Companies</Tab>
//                       <Tab>Tender Contacts</Tab>
//                       <Tab>Add News Article</Tab>
//                       <Tab>List All News</Tab>
//                       <Tab>Manage User</Tab>
//                     </TabList>

//                     <TabPanel>
//                       <ActiveListings />
//                     </TabPanel>
//                     <TabPanel>
//                       <StepperAddListing />
//                     </TabPanel>
//                     <TabPanel>
//                       <UserManagement />
//                     </TabPanel>
//                     <TabPanel>
//                       <NewsManagement />
//                     </TabPanel>
//                     <TabPanel>
//                       <PodcastsManagement />
//                     </TabPanel>
//                     <TabPanel>
//                       <GlossaryManagement />
//                     </TabPanel>
//                   </Tabs>
//                 )}
//               </div>
//             </div>
//           </section>
//         </div>

//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

import React from "react";

function Fhy() {
  return <div>Fhy</div>;
}

export default Fhy;
