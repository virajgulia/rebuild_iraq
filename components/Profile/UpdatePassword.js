import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

const UpdatePassword = ({
  passwordInfo,
  updatePasswordInfo,
}) => {

  const handleChange = (event) => {
    const newData = {
      ...passwordInfo,
      [event.target.name]: event.target.value,
    };
    updatePasswordInfo(newData);
  };

  const [isTempPass, setIsTempPass] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passInput, setPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState(false);
  
  useEffect(() => {
    setIsTempPass(localStorage.getItem("tempPass"));
  }, []);

  useEffect(() => {
    setPasswordMatch(passwordInfo);
    if (passwordMatch != null) {
      setPassInput(passwordMatch.password);
      setConfirmPassInput(passwordMatch.confirmPassword);
    } else {
      setPassInput("");
      setConfirmPassInput("");
    }
  }, [passwordInfo, passInput, confirmPassInput]);

  useEffect(() => {}, [passInput, confirmPassInput]);

  return (
    <div>
      {isTempPass === "true" ? (
        <h5>Temp Password</h5>
      ) : (
        <h5>Change Your Password</h5>
      )}

      <hr></hr>
      {isTempPass === "true" ? (
        <TextField
          required
          label="Temp Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
          value={(passwordInfo && passwordInfo.oldPassword) || ""}
          name="oldPassword"
          style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
        />
      ) : (
        <TextField
          required
          label="Old Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
          value={(passwordInfo && passwordInfo.oldPassword) || ""}
          name="oldPassword"
          style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
        />
      )}

      <br></br>
      <span className="d-block form-hint">
        To ensure account safety, password must be more than 7 characters.
      </span>
      <span className="d-block form-hint">It Must Include At Least:</span>
      <span className="d-block form-hint">
        <ul form-hint>
          <li>One capital letter</li>
          <li>One number</li>
          <li>One special character</li>
          <li>Avoid common phrases, such as: "password", etc.</li>
        </ul>
      </span>
      <TextField
        required
        label="New Password"
        type="password"
        variant="outlined"
        name="password"
        value={(passwordInfo && passwordInfo.password) || ""}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        required
        label="Confirm New Password"
        variant="outlined"
        type="password"
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        value={(passwordInfo && passwordInfo.confirmPassword) || ""}
        name="confirmPassword"
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
    </div>
  );
};

export default UpdatePassword;
