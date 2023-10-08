import React, { Component } from "react";

class ContactInfo extends Component {
  render() {
    return (
      <div className="contact-info-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="single-contact-info">
                <i className="bx bx-envelope"></i>
                <h3>Email Us:</h3>
                <p>hello@rebuildingiraq.io</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="single-contact-info">
                <i className="bx bx-phone-call"></i>
                <h3>Call Us:</h3>
                <p>Tel. + 1 (800) 801 - 4703</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="single-contact-info">
                <i className="bx bx-location-plus"></i>
                <h3>Cheyenne, WY</h3>
                <p>1623 Central Ave, Suite 201</p>
              </div>
            </div>

            {/* <div className="col-lg-3 col-sm-6">
                            <div className="single-contact-info">
                                <i className="bx bx-support"></i>
                                <h3>Live Chat</h3>
                                <p>live chat all the time with our company 24/7</p>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInfo;
