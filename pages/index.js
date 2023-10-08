import React, { useEffect, useState } from "react";
import Navbar from "../components/Layouts/Navbar";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import MainBanner from "../components/Homepage/MainBanner";
import Features from "../components/Homepage/Features";
import About from "../components/Homepage/About";
import Pricing from "../components/Pricing/PricingStyleOne";
import Footer from "../components/Layouts/Footer";
import Dialog from "@material-ui/core/Dialog";
import NewsLatter from "../components/Homepage/NewsLatter";

const Index = () => {
  const MAILCHIMP_URL =
    "https://rebuildingiraq.us7.list-manage.com/subscribe/post?u=a1129b6ed21d20f5d3f6bab63&amp;id=9b2b6da0ec";

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 15000);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollToPricing = () => {
    window.scrollTo(0, 3050);
  };

  return (
    <React.Fragment>
      <Navbar />
      <MainBanner />
      <Features scrollToPricing={scrollToPricing} />
      <About />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={(props) => {
            const { subscribe, status, message } = props || {};
            return (
              <NewsLatter
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
                handleClose={handleClose}
              />
            );
          }}
        />
      </Dialog>
      <Pricing />
      <Footer />
    </React.Fragment>
  );
};
export default Index;
