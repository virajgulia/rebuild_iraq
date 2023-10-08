import React, { Component, useState, useEffect } from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteNews, getAllNews, getNews } from "../../redux/actions/news";
import ActionNews from "../../components/Dashboard/ActionNews";
import {
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TenderStepper from "../../components/Dashboard/AddTenderComponents/TenderStepper";
import ListAllTenders from "../../components/Dashboard/ListAllTenders";
import AddTender from "../../components/Dashboard/AddTenderComponents/AddTender";
import AddTenderCategoy from "../../components/Dashboard/AddTenderCategory";
import TenderCategories from "../../components/Dashboard/TenderCategories";
import TenderCompanies from "../../components/Dashboard/TenderCompanies";
import NewsManagement from "../../components/Dashboard/NewsManagement";
import TenderContacts from "../../components/Dashboard/TenderContacts";
import CustomizedTables from "../../components/Dashboard/UserManagement";
import MainGrid from "../../components/Dashboard/MainGrid";
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
const Dash = (props) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
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
      <PageBanner
        pageTitle="Admin Dashboard"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Login"
      />
      <div>
        <section className="user-area-all-style">
          <div className="container">
            <div className="dashboard-greeting">
              <h4>Hello {firstName ? firstName : "admin"}</h4>
            </div>

            <div className="dashboard">
              {true && (
                <Tabs
                  selectedIndex={tabIndex}
                  onSelect={(tabIndex) => setTabIndex(tabIndex)}
                >
                  <TabList className="listing-content-tabs">
                    <Tab>Add Tender</Tab>
                    <Tab>List All Tenders</Tab>
                    <Tab>Tender Categories</Tab>
                    <Tab>Tender Companies</Tab>
                    <Tab>Tender Contacts</Tab>
                    <Tab>Add News Article</Tab>
                    <Tab>List All News</Tab>
                    <Tab>Manage User</Tab>
                  </TabList>

                  <TabPanel>
                    <TenderStepper
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ListAllTenders />
                  </TabPanel>
                  <TabPanel>
                    <TenderCategories
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TenderCompanies
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TenderContacts
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    {/* <MainGrid
                    openAddNew={addNews}
                    handleClose={handleClose}
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    /> */}
                    <ActionNews
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <NewsManagement
                      openAddNew={addNews}
                      handleClose={handleClose}
                      // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <CustomizedTables
                    // selectedComponent={(componentName) => setComponent(componentName)}
                    />
                  </TabPanel>
                </Tabs>
              )}
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
export default Dash;
