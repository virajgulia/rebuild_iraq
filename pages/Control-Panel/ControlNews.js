import React, { Component } from "react";
import Footer from "../../components/Layouts/Footer";
// import ControlHome from './controlHome';
import Control from "./controlPanel";
// import News from '../news';
import NewsGridCard from "../../components/News/NewsGridCard";

class ControlNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controlHere: "News",
    };
  }
  render() {
    return (
      <React.Fragment>
        <Control props={this.state.controlHere} />
        <NewsGridCard props={this.props} />
        <Footer />
      </React.Fragment>
    );
  }
}
// export async function getServerSideProps(context) {
//   let news = [];
//   try {
//     const res = await fetch(`${process.env.API_PATH}news/all`);
//     news = await res.json();
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {
//       news: news,
//     },
//   };
// }
export default ControlNews;

// import React from "react";

// function ControlNews() {
//   return <div>ControlNews</div>;
// }

// export default ControlNews;
