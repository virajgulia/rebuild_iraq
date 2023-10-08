import React, { useState, useEffect } from "react";
import { useForm } from "react-hooks-helper";

import { connect } from "react-redux";
import { createTender, resetTender } from "../../../redux/actions/tender";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TenderDetails from "./TenderDetails";
import CompanyInfo from "./CompanyInfo";
import ContactInfo from "./ContactInfo";
import CategorySelector from "./CategorySelector";
import DatePicker from "./DueDatePicker";
import Review from "./Review";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Tender Details",
    "Company Details",
    "Contact Details",
    "Categories",
    "Due Date",
    "Review",
  ];
}

const TenderStepper = (props) => {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TenderDetails
            allValues={allValues}
            updateValues={valueChangeHandler}
            valueChangeEditor={valueChangeEditor}
          />
        );
      case 1:
        return (
          <CompanyInfo
            allValues={allValues}
            updateValues={valueChangeHandler}
            changeCountry={handleCountryChange}
            storeCompany={handleStoreCompany}
            setAllValues={setAllValues}
            onSelectedCompany={setSelectedCompany}
            selectedCompany={selectedCompany}
          />
        );
      case 2:
        return (
          <ContactInfo
            allValues={allValues}
            updateValues={valueChangeHandler}
            storeContact={handleStoreContact}
            setAllValues={setAllValues}
            onSelectedContact={setSelectedContact}
            selectedContact={selectedContact}
          />
        );
      case 3:
        return (
          <CategorySelector
            updateValues={handleChangeCategories}
            selectedCategories={allValues.selectedCategories}
          />
        );
      case 4:
        return <DatePicker updateValues={handleDueDateChange} />;
      case 5:
        return (
          <Review updateValues={handleChangeCategories} allValues={allValues} />
        );
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const [allValues, setAllValues] = useState({
    // Initial default values for the form

    // Step 1 - Tender Details
    tenderTitle: "",
    tenderType: "",
    tenderValue: "",
    documentsURL: "",
    tenderDetails: "",

    // Step 2 - Company Details
    companyName: "",
    companyEmail: "",
    companyCountry: "",
    companyWebsite: "",
    companyPhoneNumber: "",
    storeCompanyInDatabase: false,

    // Step 3 - Contact Details
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
    storeContactInDatabase: false,

    // Step 4 - Categories
    selectedCategories: [],

    // Step 5 - Due Date
    dueDate: "",
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (props.msgError) {
      toast.error(props.msgError);
    }
  }, [props.msgError]);

  useEffect(() => {
    if (props.isCreated) {
      toast.success("Tender successfully created!");
      setSelectedCompany(null);
      setSelectedContact(null);
      setAllValues({
        // Step 1 - Tender Details
        tenderTitle: "",
        tenderType: "",
        tenderValue: "",
        documentsURL: "",
        tenderDetails: "",

        // Step 2 - Company Details
        companyName: "",
        companyEmail: "",
        companyCountry: "",
        companyWebsite: "",
        companyPhoneNumber: "",
        storeCompanyInDatabase: false,

        // Step 3 - Contact Details
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        phoneNumber: "",
        storeContactInDatabase: false,

        // Step 4 - Categories
        selectedCategories: [],

        // Step 5 - Due Date
        dueDate: "",
      });
      setActiveStep(0);
      resetTender()
    }
  }, [props.isCreated]);
  async function resetTender() {
    await props.resetTender();
  }

  const valueChangeHandler = (e) => {
    setAllValues((prevValues) => {
      return { ...prevValues, [e.target.name]: e.target.value };
    });
  };
  const valueChangeEditor = (value) => {
    setAllValues((prevValues) => {
      return { ...prevValues, tenderDetails: value };
    });
  };

  const handleChangeCategories = (values) => {
    setAllValues((prevValues) => {
      return { ...prevValues, selectedCategories: values };
    });
  };

  const handleDueDateChange = (expDate) => {
    setAllValues((prevValues) => {
      return { ...prevValues, dueDate: expDate };
    });
  };

  const handleCountryChange = (selectedCountry) => {
    setAllValues((prevValues) => {
      return { ...prevValues, companyCountry: selectedCountry };
    });
  };

  const handleStoreCompany = (storeCompany) => {
    setAllValues((prevValues) => {
      return { ...prevValues, storeCompanyInDatabase: storeCompany };
    });
  };

  const handleStoreContact = (storeContact) => {
    setAllValues((prevValues) => {
      return { ...prevValues, storeContactInDatabase: storeContact };
    });
  };

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {


    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      // console.log("save!!!");
      // console.log("values: ", allValues);
      await props.createTender(allValues);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [open, setOpen] = useState(false);

  // Open the 'back to control panel' dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // close the 'back to control panel' dialog
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{ textAlign: "center", marginTop: 75 }}>
            <Typography
              className={classes.instructions}
              style={{ marginBottom: 50 }}
            >
              <h3>Tender posted! What would you like to do next?</h3>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Add Another Tender
            </Button>
            {/* <Button
              onClick={() => props.selectedComponent("default")}
              color="primary"
              variant="contained"
              autoFocus
            >
              Back to Control Panel
            </Button> */}
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                id="nextStep"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
              <div>
                <hr></hr>
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
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Going back to the Control Panel will close the tender
                      dialog box and all unsaved changes will be lost.
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
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    isCreated: store.tender.isCreated,
    tender: store.tender.tender,
    msgError: store.tender.msgError,
  };
};

const mapDispatchToProps = {
  createTender,
  resetTender,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderStepper);
