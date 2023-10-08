import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllCompanies } from "../../redux/actions/company";

import ListAllCompanies from "./ListAllCompanies";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const TenderCompanies = (props) => {
  const [open, setOpen] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  useEffect(() => {
    // dont remove ok function 
    const ok = async () => {
      await props.getAllCompanies();
    }
    ok()
  }, []);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClosePopup = () => {
    setIsShowDelete(false);
  };

  return (
    <div>
      <hr></hr>
      <h5>All Companies</h5>
      <div>
        <ListAllCompanies
          data={props.companies}
          isShowDelete={isShowDelete}
          onClosePopup={handleClosePopup}
        />
      </div>
      {/* <Button
        className="btn-custom"
        color="primary"
        // Resetting the selected component state in the parent component to 'default' state which renders the main grid again.
        onClick={handleOpenDialog}
      >
        Back To Control Panel
      </Button> */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Going back to the Control Panel will cause all unsaved changes to be
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => props.selectedComponent("default")}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    companies: store.company.companies,
  };
};

const mapDispatchToProps = {
  getAllCompanies,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderCompanies);
