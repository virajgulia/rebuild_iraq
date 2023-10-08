import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { searchCompaniesStoreDatabase } from "../../../redux/actions/company";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import ReactFlagsSelect from "react-flags-select";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { countries } from "./data/countries";

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

const sleep = (delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const CompanyInfo = (props) => {
  const [selectedCountry, setSelectedCountry] = useState("Vietnam");
  const [search, setSearch] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [defaultValues, setDefaultValues] = useState({
    companyCountry: undefined,
    companyEmail: "",
    companyName: "",
    companyPhoneNumber: "",
    companyWebsite: "",
    storeCompanyInDatabase: false,
  });
  const [companySelected, setCompanySelected] = useState(null);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  // const loading = open && companies.length === 0;
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    checkedG: false,
  });

  useEffect(() => {
    if (companySelected) {
      const ok = async () => {
        await handleSelectItem(companySelected);
      }
      ok()

    }
  }, [companySelected]);

  useEffect(() => {
    if (props.companiesStoreDatabase) {
      setCompanies(props.companiesStoreDatabase);
    }
  }, [props.companiesStoreDatabase]);

  useEffect(() => {
    props.changeCountry(countries[selectedCountry]);
  }, [selectedCountry]);

  useEffect(() => {
    if (props.allValues) {
      setDefaultValues({
        ...defaultValues,
        companyCountry: props.allValues.companyCountry,
        companyEmail: props.allValues.companyEmail,
        companyName: props.allValues.companyName,
        companyPhoneNumber: props.allValues.companyPhoneNumber,
        companyWebsite: props.allValues.companyWebsite,
        storeCompanyInDatabase: props.allValues.storeCompanyInDatabase,
      });
    }
  }, [props.allValues]);

  // Check if storeCompany boolean is true, in order to make it checked on load
  useEffect(() => {
    if (props.allValues.storeCompanyInDatabase) {
      setState({ ...state, checkedG: true });
    } else {
      setState({ ...state, checkedG: false });
    }
  }, []);

  useEffect(() => {
    props.storeCompany(state.checkedG);
  }, [state]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearch(value);
    if (value !== "") {
      await props.searchCompaniesStoreDatabase(value);
    } else {
      setCompanies([]);
    }
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const handleSelectItem = async (item) => {
    await props.onSelectedCompany({
      companyCountry: item.country,
      companyEmail: item.email,
      companyName: item.name,
      companyPhoneNumber: item.phone,
      companyWebsite: item.website,
    });
    await props.setAllValues({
      ...props.allValues,
      companyCountry: item.country,
      companyEmail: item.email,
      companyName: item.name,
      companyPhoneNumber: item.phone,
      companyWebsite: item.website,
      companyID: item._id,
    });
  };

  const handleReset = async () => {
    // setIsSelected(false);
    setCompanySelected(null);
    await props.onSelectedCompany(null);
    await props.setAllValues({
      ...props.allValues,
      companyCountry: "",
      companyEmail: "",
      companyName: "",
      companyPhoneNumber: "",
      companyWebsite: "",
      storeCompanyInDatabase: "",
      companyID: null,
    });
  };

  // const handleSelectSearch = (event) => {
  //   console.log("value: ", event.target.value);
  // };

  // const handleChangeSearch = (event) => {
  //   console.log("search: ", event.target.value);
  // };

  // const handleChangeAuto = (val) => {
  //   console.log("val: ", val.target.value);
  // };

  // console.log("companySelected: ", companySelected);


  return (
    <div className="tender-information">
      <h3>Company Info</h3>
      <hr></hr>


      <div className="grid-view">
        <div className="column" style={{ width: "48%" }}>
          {!props.selectedCompany && (
            <div
              className="panel-card"
              style={{
                backgroundColor: "#f2f2f2",
                border: "1px solid #d8d8d8",
              }}
            >
              <h5>New Company</h5>
              <p>Company Name</p>
              <TextField
                required
                label="Company Name"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="companyName"
                id="companyName"
                value={props.allValues.companyName}
                // value={defaultValues.companyName}
                onChange={props.updateValues}
              />
              <p>Company Email</p>
              <TextField
                required
                label="Company Email"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="companyEmail"
                id="companyEmail"
                value={props.allValues.companyEmail}
                // value={defaultValues.companyEmail}
                onChange={props.updateValues}
              />
              <p>Country</p>
              <ReactFlagsSelect
                required
                className="country-select"
                name="companyCountry"
                id="companyCountry"
                value={selectedCountry}
                selected={selectedCountry}
                onSelect={(country) => setSelectedCountry(country)}
                onChange={props.updateValues}
                searchable={true}
              />
              <p>Website</p>
              <TextField
                label="http://"
                variant="outlined"
                style={{
                  width: "100%",
                  margin: "0 !important",
                  textAlign: "left",
                  background: "white",
                }}
                className="form-text-input"
                name="companyWebsite"
                id="companyWebite"
                value={props.allValues.companyWebsite}
                // value={defaultValues.companyWebsite}
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
                id="companyPhoneNumber"
                name="companyPhoneNumber"
                value={props.allValues.companyPhoneNumber}
                // value={defaultValues.companyPhoneNumber}
                onChange={props.updateValues}
              />
            </div>
          )}
        </div>

        <div className="column" style={{ width: "48%" }}>
          <div className="panel-card" style={{ height: "auto" }}>
            <h5>Existing Company</h5>

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
                  console.log("xxx: ", value);
                  // handleSelectItem(value);
                  console.log(value)
                  setCompanySelected(value);
                }
              }}
              getOptionLabel={(option) => option.name}
              options={companies}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by name"
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

          {props.selectedCompany && (
            <div
              className="panel-card"
              style={{ height: "auto", marginTop: 20, fontSize: "14px" }}
            >
              <ul>
                <li>
                  <p>
                    <strong>Company Name: </strong>
                    {props.selectedCompany.companyName}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Company Email: </strong>
                    {props.selectedCompany.companyEmail}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Country: </strong>
                    {props.selectedCompany.companyCountry}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Website: </strong>
                    {props.selectedCompany.companyWebsite}
                  </p>
                </li>
                <li>
                  <p>
                    <strong>Phone Number: </strong>
                    {props.selectedCompany.companyPhoneNumber}
                  </p>
                </li>
                {/* <li>
                  <p>
                    <strong>Store In Database: </strong>
                    {props.selectedCompany.storeCompanyInDatabase
                      ? "Yes"
                      : "No"}
                  </p>
                </li> */}
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
    companiesStoreDatabase: store.company.companiesStoreDatabase,
  };
};

const mapDispatchToProps = {
  searchCompaniesStoreDatabase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo);
