import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchContactsStoreDatabase } from "../../../redux/actions/contact";

import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import ReactFlagsSelect from "react-flags-select";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const CustomCheckbox = withStyles({
  root: {
    color: "#2ea3f2",
    "&$checked": {
      color: "#0c7cc7",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ContactInfo = (props) => {
  const [state, setState] = React.useState({
    checkedG: false,
  });
  const [search, setSearch] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [defaultValues, setDefaultValues] = useState({
    firstName: undefined,
    lastName: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
  });
  const [contactSelected, setContactSelected] = useState(null);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  // const loading = open && contacts.length === 0;

  useEffect(() => {
    if (contactSelected) {
      const ok = async () => {
        await handleSelectItem(contactSelected);
      }
      ok()
    }
  }, [contactSelected]);

  useEffect(() => {
    if (props.contactsStoreDatabase) {
      setContacts(props.contactsStoreDatabase);
    }
  }, [props.contactsStoreDatabase]);

  useEffect(() => {
    if (props.allValues) {
      setDefaultValues({
        ...defaultValues,
        firstName: props.allValues.firstName,
        lastName: props.allValues.lastName,
        email: props.allValues.email,
        jobTitle: props.allValues.jobTitle,
        phoneNumber: props.allValues.phoneNumber,
      });
    }
  }, [props.allValues]);

  useEffect(() => {
    if (props.allValues.storeContactInDatabase) {
      setState({ ...state, checkedG: true });
    } else {
      setState({ ...state, checkedG: false });
    }
  }, []);

  useEffect(() => {
    props.storeContact(state.checkedG);
  }, [state]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value !== "") {
      await props.searchContactsStoreDatabase(value);
    } else {
      setContacts([]);
    }
  };

  const handleSelectItem = async (item) => {
    await props.onSelectedContact({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      jobTitle: item.jobTitle,
      phoneNumber: item.phoneNumber,
    });
    await props.setAllValues({
      ...props.allValues,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      jobTitle: item.jobTitle,
      phoneNumber: item.phoneNumber,
      contactID: item._id,
    });
  };

  const handleReset = async () => {
    setContactSelected(null);
    await props.onSelectedContact(null);
    await props.setAllValues({
      ...props.allValues,
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      phoneNumber: "",
      companyID: null,
    });
  };

  return (
    <div className="spv-information">
      <h3 style={{ textAlign: "center" }}>Contact Info</h3>
      <hr></hr>

      <div className="grid-view">
        <div className="column" style={{ width: "48%" }}>
          {!props.selectedContact && (
            <div
              className="panel-card"
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #d8d8d8",
              }}
            >
              <h5>New Contact</h5>
              <p>First Name</p>
              <TextField
                required
                label="First Name"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="firstName"
                id="firstName"
                value={defaultValues.firstName}
                // value={props.allValues.firstName}
                onChange={props.updateValues}
              />
              <p>Last Name</p>
              <TextField
                required
                label="Last Name"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                id="lastName"
                name="lastName"
                value={defaultValues.lastName}
                // value={props.allValues.lastName}
                onChange={props.updateValues}
              />
              <p>Email</p>
              <TextField
                required
                label="Email"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="email"
                id="email"
                value={defaultValues.email}
                // value={props.allValues.email}
                onChange={props.updateValues}
              />
              <p>Job Title</p>
              <TextField
                label="Job Title"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="jobTitle"
                id="jobTitle"
                value={defaultValues.jobTitle}
                // value={props.allValues.jobTitle}
                onChange={props.updateValues}
              />
              <p>Phone Number</p>
              <TextField
                label="Phone Number"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                  appearance: "textfield",
                }}
                className="form-text-input"
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={defaultValues.phoneNumber}
                // value={props.allValues.phoneNumber}
                onChange={props.updateValues}
              />
            </div>
          )}
        </div>

        <div className="column" style={{ width: "48%" }}>
          <div className="panel-card" style={{ height: "auto" }}>
            <h5>Existing Contact</h5>

            <Autocomplete
              id="asynchronous-demo"
              style={{ width: "100%", backgroundColor: "white" }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionSelected={(option, value) => {
                if (value._id === option._id) {
                  setContactSelected(value);
                }
              }}
              getOptionLabel={(option) =>
                `${option.firstName} ${option.lastName}`
              }
              options={contacts}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by first or last name"
                  variant="outlined"
                  onChange={handleSearch}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </div>

          {props.selectedContact && (
            <div
              className="panel-card"
              style={{ height: "auto", marginTop: 20, fontSize: "14px" }}
            >
              <ul>
                <li>
                  <p>
                    <strong>First Name: </strong>
                    {props.selectedContact.firstName}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Last Name: </strong>
                    {props.selectedContact.lastName}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Email: </strong>
                    {props.selectedContact.email}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Job Title: </strong>
                    {props.selectedContact.jobTitle}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Phone Number: </strong>
                    {props.selectedContact.phoneNumber}
                  </p>
                </li>
              </ul>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    contactsStoreDatabase: store.contact.contactsStoreDatabase,
  };
};

const mapDispatchToProps = {
  searchContactsStoreDatabase,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
