import React from "react";

import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import ActionNews from "../../components/Dashboard/ActionNews";

const NewArticle = (props) => {
  const handleClose = () => {
    console.log("close popup");
  };
  
  return (
    <React.Fragment>
      <Navbar />
      <div>
        <section className="user-area-all-style">
          <div className="container dashboard-background">
            <div className="dashboard-greeting">
              <h4>New Article</h4>
            </div>

            <div className="dashboard">
              <ActionNews handleClose={handleClose} />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default NewArticle;
