import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  getAllTender,
  deleteTender,
  resetTender,
} from "../../redux/actions/tender";

import { toast, ToastContainer } from "react-toastify";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListAllTendersTable from "./ListAllTendersTable";

const ListAllTenders = (props) => {
  const [open, setOpen] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editTender, seteditTender] = useState(false);

  useEffect(() => {
    props.getAllTender();
  }, [editTender]);

  const changeEitd = () => {
    seteditTender(!editTender);
  };

  useEffect(() => {
    if (props.isDeleted) {
      toast.success("Deleted successfully!");
      setDeleteId(null);
      setIsShowDelete(false);
      setIsShowEdit(false);
      // dont remove ok function 
      const ok = async () => {
        await props.getAllTender();
        await props.resetTender();
      }
      ok()

    }
  }, [props.isDeleted]);

  useEffect(() => {
    if (props.msgError) {
      toast.error(props.msgError);
    }
  }, [props.msgError]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDeleteTender = async (id, data) => {
    await props.deleteTender(id, data);
  };

  const handleDeleteRow = (id) => {
    console.log("id delete: ", id);
    setDeleteId(id);
    setIsShowDelete(true);
  };

  const handleEdit = (id) => {
    console.log(`Edit id : ${id}`);
    setEdit(id);
    setIsShowEdit(true);
  };

  const handleCloseEdit = () => {
    setIsShowEdit(false);
  };

  const handleClosePopup = () => {
    setIsShowDelete(false);
  };

  return (
    <div>
      <hr></hr>
      <h5>All Tenders</h5>
      <div>
        <ListAllTendersTable
          data={props.tenders}
          onDelete={handleDeleteTender}
          onDeleteRow={handleDeleteRow}
          onEditRow={handleEdit}
          deleteId={deleteId}
          isShowDelete={isShowDelete}
          isShowEdit={isShowEdit}
          onClosePopup={handleClosePopup}
          onCloseEdit={handleCloseEdit}
          changeEitd={changeEitd}
        />
      </div>
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
    tenders: store.tender.tenders,
    isDeleted: store.tender.isDeleted,
    msgError: store.tender.msgError,
  };
};

const mapDispatchToProps = {
  getAllTender,
  deleteTender,
  resetTender,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAllTenders);
