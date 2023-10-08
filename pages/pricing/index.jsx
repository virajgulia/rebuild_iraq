import React from "react";
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import Pricing from "../../components/Pricing/Pricing";

const PricingPage = (props) => {
  return (
    <div>
      <Navbar />
      <Pricing />
      <Footer />
    </div>
  );
};

export default PricingPage;
