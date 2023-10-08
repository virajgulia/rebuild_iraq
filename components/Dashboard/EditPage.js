import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
function EditPage() {
  return (
    <>
      <div className="rich-text-editor">
        <div className="form-add-news form-add-listing px-5">
          <div>
            <TextField
              required
              label="Name"
              style={{ width: "100%", marginBottom: "15px" }}
            />
          </div>

          <div>
            <TextField
              required
              style={{ width: "100%", marginBottom: "15px" }}
              id="standard-multiline-flexible"
              label="Email"
            />
          </div>
          <div>
            <TextField
              required
              style={{ width: "100%", marginBottom: "15px" }}
              label="Phone Number"
            />
          </div>
          <div>
            <TextField
              required
              placeholder="Please enter the new password"
              style={{ width: "100%", marginBottom: "15px" }}
              id="standard-multiline-flexible"
              label="Password"
            />
          </div>
          <div>
            <span style={{ fontSize: 12, color: "#9B9B9B" }}>User Type</span>
            <FormControl
              required
              style={{ width: "100%", marginBottom: "15px" }}
            >
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={userType ? userType : null}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Publisher">Publisher</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Switch />
            <span>Confirmed</span>
          </div>
          <div style={{ display: "flex", marginBottom: 30 }}>
            <h6 style={{ marginRight: 65, fontWeight: "bolder" }}>Note</h6>
            <TextField
              id="outlined-basic"
              label="Add Note"
              variant="outlined"
              // rows={10}
              style={{ width: 800, height: 5, marginRight: 20 }}
              // size="large"
            />
            <Button
              variant="contained"
              className="btn-custom"
              color="primary"
              style={{ height: 55, width: 10 }}
            >
              Enter
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <h6 style={{ marginRight: 25, fontWeight: "bolder" }}>
              Client Log
            </h6>
            <div
              style={{
                width: 800,
                height: 250,
                borderWidth: 2,
                borderColor: "black",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
              }}
              // size="large"
            >
              <table>
                <tr>
                  <th style={{ fontSize: 17 }}>Date</th>
                  <th style={{ fontSize: 17 }}>Admin Name</th>
                  <th style={{ fontSize: 17 }}>Note</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="btn-custom-next">
          <Button variant="contained" className="btn-custom" color="primary">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
export default EditPage;
