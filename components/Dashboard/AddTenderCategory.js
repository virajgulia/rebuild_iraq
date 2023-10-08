import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

import { connect } from "react-redux";
import { createCategory, getAllCategories } from "../../redux/actions/category";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const CustomCheckbox = withStyles({
  root: {
    color: "#2ea3f2",
    "&$checked": {
      color: "#0c7cc7",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AddTenderCategory = (props) => {
  // Checkbox selection that determines whether the category is a subcategory
  const [state, setState] = useState({
    isSubcategory: false,
    // name: "",
    // title: "",
    // description: "",
    // isSubcategory: false,
    // parent: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (props.isCreated) {
      toast.success("Tender category successfully created!");
      setState({ isSubcategory: false });
    }
  }, [props.isCreated]);

  useEffect(() => {
    if (props.msgError) {
      toast.error(props.msgError);
    }
  }, [props.msgError]);

  const handleCheckbox = async (event) => {
    if (event.target.checked) {
      await props.getAllCategories();
    }
    setState({ ...state, isSubcategory: event.target.checked });
    setVisibility(!visibility);
  };

  // Select
  const [parentCategory, setParentCategory] = useState("");

  const handleParentSelection = (event) => {
    setState({ ...state, parent: event.target.value });
    setParentCategory(event.target.value);
  };

  // Toggling Visibility
  const [visibility, setVisibility] = useState(false);

  // Initial state of the dialog
  const [open, setOpen] = useState(false);

  // Open the 'cancelation' dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // close the dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    props.isItVisible(false);
    props.isItDisabled(false);
  };

  const handleChangeInput = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async () => {

    if (!state.isSubcategory) {
      delete state.parent;
    }
    state.subCategories = [];
    await props.createCategory(state);
    window.location.reload();
  };

  return (
    <div
      className="panel-card"
      style={{ backgroundColor: "#f2f2f2", border: "1px solid #d8d8d8" }}
    >
      <h5>Add New Tender Category</h5>
      <hr></hr>
      <div className="">
        <TextField
          required
          label="Category Name"
          variant="outlined"
          name="name"
          style={{
            width: "100%",
            margin: "10px 0px 10px 0px !important",
            textAlign: "left",
            backgroundColor: "white",
          }}
          className="form-text-input"
          onChange={(event) =>
            handleChangeInput(event.target.name, event.target.value)
          }
        />
      </div>

      <div className="" style={{ marginTop: 20 }}>
        <TextField
          required
          label="Category Title"
          name="title"
          variant="outlined"
          style={{
            width: "100%",
            margin: "10px 0px 10px 0px !important",
            textAlign: "left",
            backgroundColor: "white",
          }}
          className="form-text-input"
          onChange={(event) =>
            handleChangeInput(event.target.name, event.target.value)
          }
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <TextField
          id="outlined-multiline-static"
          label="Details"
          name="description"
          style={{
            width: "100%",
            margin: "10px 0px 10px 0px !important",
            textAlign: "left",
            backgroundColor: "white",
          }}
          required
          multiline
          rows={6}
          variant="outlined"
          onChange={(event) =>
            handleChangeInput(event.target.name, event.target.value)
          }
        />
      </div>

      <div>
        <FormControlLabel
          control={
            <CustomCheckbox
              // checked={state.isSubcategory}
              onChange={handleCheckbox}
              name="isSubcategory"
            />
          }
          label="Is this a subcategory?"
        />
      </div>

      {state.isSubcategory && (
        <div>
          <InputLabel id="demo-simple-select-label">
            Select Parent Category
          </InputLabel>
          <Select
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              getContentAnchorEl: null,
            }}
            style={{
              width: "100%",
              color: "#000000 !important",
              backgroundColor: "white",
            }}
            name="parent"
            label="Parent Category"
            labelId="demo-simple-select-label"
            variant="outlined"
            onChange={handleParentSelection}
          >
            {props.categories &&
              props.categories.length > 0 &&
              props.categories.map((item, i) => (
                <MenuItem value={item._id} key={i}>
                  {item.title}
                </MenuItem>
              ))}
          </Select>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <Button
          onClick={handleSubmit}
          style={{ marginRight: 20 }}
          color="primary"
          variant="contained"
        >
          Save Category
        </Button>
        <Button color="primary" onClick={handleOpenDialog}>
          Cancel
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ padding: "15px !important" }}
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All unsaved changes to be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCancel}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    categories: store.category.categories,
    category: store.category.category,
    isCreated: store.category.isCreated,
    msgError: store.category.isCreated,
  };
};

const mapDispatchToProps = {
  createCategory,
  getAllCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTenderCategory);
