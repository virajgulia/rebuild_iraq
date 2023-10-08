import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { toast, ToastContainer } from "react-toastify";

const NewsLatter = ({ status, message, onValidated, handleClose }) => {
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const handleFormSubmit = () => {
    if (!email) {
      setError("Please enter a valid email address");
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email, FNAME: name });
    return email && email.indexOf("@") > -1 && isFormValidated;
  };

  useEffect(() => {
    if (status == "error") {
      toast.error("Email is already subscribed to list Calling!");
      handleClose()
    } else if (status == "success") {
      toast.success(message);
      handleClose()
    }
  }, [message]);

  const handleInputKeyEvent = (event) => {
    setError(null);
    if (event.keyCode === 13) {
      event.preventDefault();
      handleFormSubmit();
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="flex newsletter-input-fields">
        <div className="close-button-container">
          <span className="close-button" onClick={handleClose}>
            X
          </span>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-12">
              <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
              <div className="mc-field-group py-4 px-2" >
                <div style={{ height: 40 }}>
                  <input
                    required
                    style={{ width: "100%",height: 40,fontSize: 15, paddingLeft:5 }}
                    label="Enter Your Name"
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                    onChange={(e) => setName(e?.target?.value ?? "")}
                  />
                </div>
                <div style={{ height: 95 }}>
                  <input
                    required
                    style={{ width: "100%", marginTop: 20, height: 40,fontSize: 15, paddingLeft:5}}
                    label="Enter Your Email"
                    type="email"
                    placeholder="Enter your Email"
                    onKeyUp={(event) => handleInputKeyEvent(event)}
                    onChange={(event) => setEmail(event?.target?.value ?? "")}
                  />
                  {error ? <span style={{ color: "red" }}>{error}</span> : null}
                </div>
                <div style={{textAlign:'center'}}>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="default-btn"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
