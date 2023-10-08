import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { getAllCategories, deleteCategory } from "../../redux/actions/category";

import Button from "@material-ui/core/Button";

import TreeView from "@material-ui/lab/TreeView";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import TreeItem from "@material-ui/lab/TreeItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddTenderCategory from "./AddTenderCategory";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    height: "auto",
    flexGrow: 1,
    maxWidth: 400,
  },
});


const TenderCategories = (props) => {
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    props.getAllCategories();
  }, [getAllCategories]);

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const hDelete = (id) => {
    console.log(id);
     deleteCategory(id);
     window.location.reload()
  };
  return (
    <div>
      <hr></hr>
      <h4>Manage Tender Categories</h4>

      <div className="panel-card">
        <h5>Existing Categories</h5>
        <br />
        <br />
        <Grid container spacing={1}>
          {props.categories.length > 0 &&
            props.categories.map((e) => {
              return (
                <>
                  <Grid item sm={6}>
                    <Typography>
                      <b>{e.title}</b>
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => hDelete(e._id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </div>

      <div style={{ margin: "20px auto 20px auto" }}>
        <Button
          color="primary"
          variant="contained"
          disabled={isDisabled}
          onClick={() => {
            setVisibility(true);
            setIsDisabled(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {visibility ? (
        <div style={{ marginTop: 20 }}>
          <AddTenderCategory
            isItVisible={setVisibility}
            isItDisabled={setIsDisabled}
          />
        </div>
      ) : null}

      <div>
        <hr></hr>
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Going back to the Control Panel will cause all unsaved changes to
              be lost.
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
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    categories: store.category.categories,
  };
};

const mapDispatchToProps = {
  getAllCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderCategories);
