import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { getProfile } from "../../redux/actions/user";

const UpdatePersonalInfo = ({user, updatePersonalInfo,profileInfo,...props }) => {
  console.log(props)
  const handleChange = (name, value) => {
    const newData = { ...user, [name]: value };
    updatePersonalInfo(newData);
    props.isUpdated = true;
    console.log(props.user);}; 
    
  return (
   
    <div className="personal-update-form">
      <h5>Update Your Personal Information</h5>
      <hr></hr>
      <TextField
        required
        label="First Name"
        variant="outlined"
        value={(user && user.firstName) || ""}
        onChange={(e) => handleChange("firstName", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        required
        label="Last Name"
        variant="outlined"
        value={(user && user.lastName) || ""}
        onChange={(e) => handleChange("lastName", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        value={(user && user.phoneNumber) || ""}
        onChange={(e) => handleChange("phoneNumber", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        label="Country"
        variant="outlined"
        value={(user && user.country) || ""}
        onChange={(e) => handleChange("country", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        label="Company"
        variant="outlined"
        value={(user && user.company) || ""}
        onChange={(e) => handleChange("company", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
      <TextField
        label="Website"
        variant="outlined"
        value={(user && user.website) || ""}
        onChange={(e) => handleChange("website", e.target.value)}
        style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
      />
    </div>
  );
};

export default UpdatePersonalInfo;
