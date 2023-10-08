import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import Router, { useRouter } from "next/router";
import axios from "axios";

import { connect } from "react-redux";
import {
  getProfile,
  updateProfile,
  updatePassword,
} from "../../redux/actions/user";

import Button from "@material-ui/core/Button";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import UpdatePayment from "./UpdatePayment";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Material UI Dialog components
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Loader from "../Shared/Loader";

// Importing update components
import UpdatePersonalInfo from "./UpdatePersonalInfo";

// Per Material UI documentation, calling the "SLIDE" transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = (props) => {
  console.log(props);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [dialogComponent, setDialogComponent] = useState("");
  const [dialogTitle, setDialogTitle] = useState("Title");
  const [loading, setLoading] = useState(false);
  const [passwordInfo, setPasswordInfo] = useState({});
  const [tempPass, setTempPass] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [preference, setPreference] = useState(false);
  const router = useRouter();

  console.log("Profile", props);

  useEffect(() => {
    setLoading(true);
    props.getProfile();
  }, []);

  useEffect(() => {
    setTempPass(localStorage.getItem("tempPass"));
  }, []);

  useEffect(() => {
    if (tempPass === "true") {
      setDialogComponent("updatePassword");
      handleOpenProfileEditDialog();
    }
  }, [tempPass]);

  useEffect(() => {
    if (props.isUpdated && props.profile) {
      // props.getProfile();
      toast.success("Updated personal info successfully!");
      handleCloseProfileEditDialog();
    }
    if (props.isUpdatedPassword) {
      // props.getProfile();
      toast.success("Updated password successfully!");
      handleCloseProfileEditDialog();
    }
  }, [props.isUpdated, props.isUpdatedPassword]);

  useEffect(() => {
    if (props.msgError) {
      toast.error(props.msgError);
    }
  }, [props.msgError]);

  useEffect(() => {
    //console.log(props.profile)
    // if (props.profile.subscribe || props.profile.subscribe!== undefined ){

    // }else{
    //   props.profile.subscribe=true;
    // }
    if (props.profile) {
      console.log("dddd", props.profile);

      const personal = {
        firstName: props.profile.firstName || "",
        lastName: props.profile.lastName || "",
        phoneNumber: props.profile.phoneNumber || "",
        country: props.profile.country || "",
        company: props.profile.company || "",
        website: props.profile.website || "",
      };
      console.log(personal);
      setPersonalInfo(personal);
    }
  }, [props.profile]);

  useEffect(() => {
    props.profile && props.profile.subscribe && props.profile.subscribe === true
      ? setPreference(true)
      : setPreference(false);

    setLoading(true);
    if (props.profile && props.profile.plan === "free") {
      const beforeTime = moment(props.profile.startPlan);
      const nowTime = moment(new Date());
      const leftHours = nowTime.diff(beforeTime, "hours");
      console.log("leftHours: ", leftHours);
      if (leftHours > 47) {
        router.push("/required-user");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [props.profile]);

  useEffect(() => {
    console.log(preference);
  }, [preference]);
  const handleOpenProfileEditDialog = () => {
    setOpenProfileEdit(true);
  };

  const handleCloseProfileEditDialog = () => {
    setOpenProfileEdit(false);
  };

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleCloseAll = () => {
    setOpenAlert(false);
    setOpenProfileEdit(false);
  };

  const handleUpdatePersonal = (data) => {
    setPersonalInfo(data);
  };

  const selectedUpdate = () => {
    switch (dialogComponent) {
      case "updatePersonal":
        return (
          <UpdatePersonalInfo
            user={personalInfo}
            updatePersonalInfo={handleUpdatePersonal}
            profileInfo={props.profile}
          />
        );
      case "updateEmail":
        return <UpdateEmail />;
      case "updatePassword":
        return (
          <UpdatePassword
            updatePasswordInfo={setPasswordInfo}
            passwordInfo={passwordInfo}
          />
        );
      default:
        return "Unknown error";
    }
  };
  const handleSubmitUpdate = async () => {
    setOpenAlert(false);
    setOpenProfileEdit(false);

    switch (dialogComponent) {
      case "updatePersonal":
        console.log("data: ", personalInfo);
        await props.updateProfile(personalInfo);
        // return 1;
        window.location.reload();
      case "updateEmail":
        return 1;
      case "updatePassword":
        console.log("passwordInfo: ", passwordInfo);
        await props.updatePassword(passwordInfo);
      default:
        return 1;
    }
  };
  const updatepreference = (status) => {
    if (localStorage.getItem("zyen_token")) {
      const token = localStorage.getItem("zyen_token");
      sub(token, status);
      setPreference(status);
    } else {
      router.push("/login");
    }
  };
  const sub = (token, status) => {
    axios.create({
      baseURL: process.env.ROOT_URL || "/api/",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
      },
      paramsSerializer(params) {},
    });
    axios
      .get(`api/user/subscribe?token=${token}&subscribe=${status}`)
      .then((res) => {
        toast.success("Updated successfully!");
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const handleEditPlan = () => {
    router.push("/pricing");
  };
  console.log(preference);
  return (
    /* <section className="user-area-all-style">*/
    <>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="container dashboard-background">
          <div className="dashboard-greeting">
            <h4>Welcome Back</h4>
          </div>

          <hr></hr>

          <div className="profile-main-section">
            <div className="personal-information">
              <div className="panel-card ">
                <div className="profile-overview-header-section">
                  <h6>Personal Information</h6>
                  <Button
                    variant="contained"
                    color="primary"
                    className="profile-update-button"
                    onClick={() => {
                      setDialogComponent("updatePersonal");
                      handleOpenProfileEditDialog();
                    }}
                  >
                    Edit
                  </Button>

                  <Dialog
                    open={openProfileEdit}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseProfileEditDialog}
                    disableBackdropClick="true"
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">
                      {tempPass === "true"
                        ? "You Must Reset Your Password In Order To Continue"
                        : "Fill All The Required Fields Below"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        {selectedUpdate()}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      {tempPass === "true" ? (
                        ""
                      ) : (
                        <Button onClick={handleOpenAlert} color="primary">
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={handleSubmitUpdate}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                        {/* {tempPass === "true" ? "Reset" : "Submit"} */}
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Dialog
                    open={openAlert}
                    onClose={handleCloseAlert}
                    disableBackdropClick="true"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Are you sure?
                    </DialogTitle>
                    <DialogContentText
                      id="alert-dialog-description"
                      style={{ padding: 25 }}
                    >
                      All unsaved changes will be lost.
                    </DialogContentText>
                    <DialogActions>
                      <Button onClick={handleCloseAlert}>No</Button>
                      <Button
                        onClick={handleCloseAll}
                        variant="contained"
                        color="primary"
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

                <hr></hr>
                <p>
                  First Name: {(props.profile && props.profile.firstName) || ""}
                </p>
                <p>
                  Last Name: {(props.profile && props.profile.lastName) || ""}
                </p>
                <p>
                  Phone: {(props.profile && props.profile.phoneNumber) || ""}
                </p>
                <p>Country: {(props.profile && props.profile.country) || ""}</p>
                <p>Company: {(props.profile && props.profile.company) || ""}</p>
                <p>Website: {(props.profile && props.profile.website) || ""}</p>
              </div>

              <div className="panel-card membership-information">
                <div className="profile-overview-header-section">
                  <h6>Membership Information</h6>
                  <Button
                    variant="contained"
                    color="primary"
                    className="profile-update-button"
                    onClick={handleEditPlan}
                  >
                    Upgrade
                  </Button>
                </div>

                <hr></hr>
                <p>
                  Member Since:{" "}
                  {(props.profile &&
                    props.profile.started &&
                    moment
                      .unix(props.profile.started)
                      .local()
                      .format("MM/DD/YYYY")) ||
                    ""}
                </p>
                <p>
                  Membership Type:{" "}
                  {(props.profile && props.profile.planName) || ""}
                </p>
                <p>
                  Renewal Date:{" "}
                  {(props.profile &&
                    props.profile.renew &&
                    moment
                      .unix(props.profile.renew)
                      .local()
                      .format("MM/DD/YYYY")) ||
                    ""}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "20px" }} className="panel-card">
              <h6>Make Other Changes</h6>
              <hr></hr>

              <Button
                variant="contained"
                color="primary"
                className="profile-update-button"
                onClick={() => {
                  setDialogComponent("updatePassword");
                  handleOpenProfileEditDialog();
                }}
              >
                Change Password
              </Button>
            </div>
            <div style={{ marginTop: "20px" }} className="panel-card">
              <h6>Update your preferences</h6>
              <hr></hr>
              Tender Alerts
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={preference}
                      onChange={(e) => {
                        updatepreference(e.target.checked);
                      }}
                    />
                  }
                  label=""
                />
              </FormGroup>
            </div>
          </div>

          <br></br>
          <hr></hr>

          {/* <UpdatePayment /> */}
        </div>
      )}

      {/* </section> */}
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    profile: store.user.profile,
    isUpdated: store.user.isUpdated,
    isUpdatedPassword: store.user.isUpdatedPassword,
    msgError: store.user.msgError,
  };
};

const mapDispatchToProps = {
  getProfile,
  updateProfile,
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
