import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { connect } from "react-redux";
import { checkExistId } from "../../redux/actions/listing";
import { toast, ToastContainer } from "react-toastify";
import Button from "@material-ui/core/Button";

class AddListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onChangeUploadImage: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.listingDetail) {
      const { listingDetail } = this.props;
      await this.setState({
        listingName: listingDetail.SPVName,
        SPVId: listingDetail.SPVId,
        tokenName: listingDetail.tokenName,
        country: listingDetail.country,
        state: listingDetail.state,
        description: listingDetail.description,
        image: listingDetail.image,
      });
    } else {
      if (localStorage.getItem("dataSPV")) {
        const dataSPV = JSON.parse(localStorage.getItem("dataSPV"));
        await this.setState({
          listingName: dataSPV.SPVName,
          SPVId: dataSPV.SPVId,
          tokenName: dataSPV.tokenName,
          country: dataSPV.country,
          state: dataSPV.state,
          description: dataSPV.description,
        });
      }
    }
  };

  onChange = async (name) => {
    await this.setState({ [name]: event.target.value });
  };

  selectCountry = async (val) => {
    await this.setState({ country: val });
  };

  selectRegion = async (val) => {
    await this.setState({ state: val });
  };

  changeUpload = async (e) => {
    const dataFile = e.target.files;
    if (dataFile.length > 0) {
      let reader = new FileReader();
      let url = reader.readAsDataURL(dataFile[0]);
      reader.onloadend = function (e) {
        this.setState({
          imgSrc: [reader.result],
          onChangeUploadImage: true,
        });
      }.bind(this);
      this.setState({ image: dataFile[0] });
    }
  };
  handleNext = async () => {
    const {
      listingName,
      SPVId,
      tokenName,
      // country,
      // state,
      // description,
      // image,
    } = this.state;
    if (
      listingName &&
      SPVId &&
      tokenName
      // country &&
      // state &&
      // description
      // image
    ) {
      if (!this.props.listingDetail) {
        await this.props.checkExistId(SPVId);
      }
      if (this.props.isExist) {
        toast.error("SPV-ID already existed!");
      } else {
        const data = {
          SPVId: SPVId.trim(),
          SPVName: listingName,
          // description,
          // country,
          // state,
          tokenName,
          // image,
        };
        if (!this.props.listingDetail) {
          localStorage.setItem("dataSPV", JSON.stringify(data));
        }
        this.props.passDataOfSPV(data);
      }
    } else {
      toast.error("Please fill all the required fields!");
    }
  };

  render() {
    const {
      imgSrc,
      listingName,
      SPVId,
      tokenName,
      country,
      state,
      description,
      onChangeUploadImage,
    } = this.state;
    const { listingDetail } = this.props;
    return (
      <div className="spv-information">
        <h3>Tender Details</h3>
        <hr></hr>
        <Typography variant="h3"></Typography>

        <div className="form-add-listing">
          <div className="">
            <TextField
              required
              label="Title"
              variant="outlined"
              style={{
                width: "100%",
                margin: "0 !important",
                textAlign: "left",
              }}
              className="form-text-input"
              value={listingName}
              onChange={() => this.onChange("listingName")}
            />
          </div>

          <div className="grid-view">
            <div className="column">
              <Select
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
                // value={country}
                style={{ width: "100%", color: "#000000" }}
                label="Tender Type"
                variant="outlined"
                // onChange={(val) => this.selectCountry(val)}
              >
                <MenuItem value={10}>- - -</MenuItem>
                <MenuItem value={30}>Contract Notice</MenuItem>
              </Select>
            </div>

            <div className="column">
              {!listingDetail && (
                <TextField
                  label="Tender Value"
                  variant="outlined"
                  value={SPVId}
                  onChange={() => this.onChange("SPVId")}
                />
              )}
            </div>

            <div className="column">
              <TextField
                label="Custom ID"
                variant="outlined"
                value={tokenName}
                onChange={() => this.onChange("tokenName")}
              />
            </div>
          </div>

          <div>
            <TextField
              id="outlined-multiline-static"
              label="Tender Details"
              multiline
              rows={6}
              variant="outlined"
            />
          </div>
        </div>
        <div className="btn-custom-next">
          <Button
            variant="contained"
            className="btn-custom"
            color="primary"
            onClick={this.handleNext}
          >
            Next Step
          </Button>
        </div>

        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isExist: store.listing.isExist,
  };
};

const mapDispatchToProps = {
  checkExistId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddListing);
