import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const UpdateEmail = () => {
    return (
        <div>
            <h5>Update Your Email Address</h5>
            <hr></hr>
            <TextField
                required
                label="Old Email"
                variant="outlined"
                style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
              
            />

            <br></br>
            <TextField
                required
                label="New Email"
                variant="outlined"
                style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
              
            />
            <TextField
                required
                label="Confirm New Email"
                variant="outlined"
                style={{ width: "100%", marginBottom: 20, textAlign: "left" }}
              
            />
            <div>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default UpdateEmail;