import React, { Component, useState, useEffect } from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import Router from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews, getNews } from "../../redux/actions/news";

import {
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import ActiveListings from "../../components/Dashboard/ActiveListings";
import StepperAddListing from "../../components/Dashboard/StepperAddListing";
import UserManagement from "../../components/Dashboard/UserManagement";
import NewsManagement from "../../components/Dashboard/NewsManagement";
import ControlPanel from "../../components/Dashboard/ControlPanel";
import CloseIcon from "@material-ui/icons/Close";
import ActionNews from "../../components/Dashboard/ActionNews";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  appBar: {
    position: "relative",
    background: "#00095e",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
  container: {
    paddingLeft: 200,
    paddingRight: 200,
    "@media (max-width: 768px)": {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = (props) => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [firstName, setfirstName] = useState(null);
  const [open, setOpen] = useState(false);
  const [typeModal, setTypeModal] = React.useState("");

  const newsDetail = useSelector((state) => state.news.newsDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("isAdmin")) {
      if (localStorage.getItem("isAdmin") === "false") {
        Router.push("/profile");
      } else {
        if (typeof window !== "undefined") {
          setfirstName(localStorage.getItem("firstName"));
        }
      }
    } else {
      Router.push("/login");
    }
  }, []);

  const handleClickOpen = async (newsId) => {
    console.log('handleClickOpen:')
    await dispatch(getNews(newsId));
    setTypeModal("edit");
    setOpen(true);
  };

  const handleClose = async () => {
    console.log("handleClose: ");
    setOpen(false);
    await dispatch(getAllNews());
  };

  const addNews = () => {
    setOpen(true);
    setTypeModal("add");
  };

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <section className="user-area-all-style">
          <div className="container dashboard-background">
            <div className="dashboard-greeting">
              <h4>Hello {firstName ? firstName : "admin"}</h4>
            </div>

            <div className="dashboard">
              <ControlPanel openAddNew={addNews} handleClose={handleClose} />
            </div>
          </div>
        </section>
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {typeModal === "add" ? "Add News" : "Edit News"}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.container}>
          {typeModal === "add" ? (
            <ActionNews handleClose={handleClose} />
          ) : (
            <ActionNews handleClose={handleClose} newsDetail={newsDetail} />
          )}
        </div>
      </Dialog>
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
