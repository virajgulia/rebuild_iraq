import React from "react";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddListing from "../AddListing";
import { toast, ToastContainer } from "react-toastify";
import AddProject from "../AddProject";
import { addListing, updateSPV } from "../../../redux/actions/listing";
import { updateProject } from "../../../redux/actions/project";
import Button from "@material-ui/core/Button";

function getSteps() {
  return ["Tender Details", "Company Details", "3"];
}

function getStepsEdit() {
  return ["Edit SPV", "Edit Project and Edit Asset"];
}

class StepperAddListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selectedComponent: null
    };
  }

  componentDidMount = async () => {
    await localStorage.removeItem("dataSPV");
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddListing
            passDataOfSPV={this.getDataOfSPV}
            listingDetail={this.props.listingDetail}
          />
        );
      case 1:
        return (
          <div className="spv-information">
            <div className="form-add-listing">
              <AddListing
                // passDataOfProject={this.getDataOfProject}
                // handleBack={this.handleBack}
                // listingDetail={this.props.listingDetail}
                
              />
            </div>
          </div>
        );
        case 2:
          return (
            <div>
              <h1>
                Test
              </h1>
            </div>
          );

      default:
        return "Unknown step";
    }
  };

  getDataOfSPV = async (data) => {
    await this.setState({ dataSPV: data });
    if (this.state.dataSPV) {
      this.setState({
        activeStep: 1,
      });
    }
    if (this.props.listingDetail) {
      const { dataSPV } = this.state;
      let fd = new FormData();
      fd.append("SPVName", dataSPV.SPVName);
      fd.append("country", dataSPV.country);
      fd.append("description", dataSPV.description);
      fd.append("state", dataSPV.state);
      fd.append("tokenName", dataSPV.tokenName);
      if (!dataSPV.image.filename) {
        fd.append("image", dataSPV.image);
      }
      await this.props.updateSPV(dataSPV.SPVId, fd);
    }
  };

  getDataOfProject = async (data) => {
    await this.setState({ dataProject: data });
    const { dataSPV, dataProject } = this.state;
    if (this.props.listingDetail) {
      if (dataProject.length > 0) {
        let fd = new FormData();
        const dataProjectForm = JSON.stringify(dataProject);
        fd.append("dataProjectObject", dataProjectForm);
        dataProject.map((project) => {
          if (project.id) {
            if (project.image.name) {
              fd.append("files", project.image);
            }
            project.projectsDocument.map((projectsDocument) => {
              if (projectsDocument.name) {
                fd.append("files", projectsDocument);
              }
            });
            project.confidential.map((confidential) => {
              if (confidential.name) {
                fd.append("files", confidential);
              }
            });
          } else {
            fd.append("files", project.image);
            project.projectsDocument.map((projectsDocument) => {
              fd.append("files", projectsDocument);
            });
            project.confidential.map((confidential) => {
              fd.append("files", confidential);
            });
          }
        });
        await this.props.updateProject(fd);
        if (await this.props.isEditProject) {
          this.handleFinish();
        } else {
          toast.error("Edit Project Error!");
        }
      } else {
        this.handleFinish();
      }
    } else {
      let fd = new FormData();
      fd.append("SPVId", dataSPV.SPVId.trim());
      fd.append("SPVName", dataSPV.SPVName);
      fd.append("description", dataSPV.description);
      fd.append("country", dataSPV.country);
      fd.append("state", dataSPV.state);
      fd.append("tokenName", dataSPV.tokenName);
      fd.append("files", dataSPV.image);
      if (dataProject.length > 0) {
        const dataProjectForm = JSON.stringify(dataProject);
        fd.append("dataProjectObject", dataProjectForm);
        dataProject.map((project) => {
          fd.append("files", project.image);
          project.projectsDocument.map((projectsDocument) => {
            fd.append("files", projectsDocument);
          });
          project.confidential.map((confidential) => {
            fd.append("files", confidential);
          });
        });
      }
      await this.props.addListing(fd);
      if (await this.props.isAddListing) {
        this.handleFinish();
      } else {
        toast.error("Add Listing Error!");
      }
    }
  };

  isStepOptional = (step) => {
    return step === null;
  };

  handleFinish = async () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { listingDetail } = this.props;
    const steps = listingDetail ? getStepsEdit() : getSteps();
    const { activeStep } = this.state;
    return (
      <div className="custom-stepper-add-spv">
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="btn-add-more">
          {activeStep === steps.length ? (
            <div>
              <Typography>
                {listingDetail
                  ? "Listing updated successfully."
                  : "Listing added successfully."}
              </Typography>
              {!listingDetail && (
                <Button
                  variant="contained"
                  className="btn-custom"
                  color="primary"
                  onClick={this.handleReset}
                >
                  Add More
                </Button>
              )}
            </div>
          ) : (
            <div>{this.getStepContent(activeStep)}</div>
          )}
        </div>
        
        <ToastContainer />
        {/* <Button
          className="btn-custom"
          color="primary"
          // Resetting the selected component state in the parent component to 'default' state which renders the main grid again.
          onClick={() => this.props.selectedComponent('default')}
        >
          Back To Control Panel
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    isAddListing: store.listing.isAddListing,
    msgErr: store.listing.msgErr,
    isEditProject: store.project.isEditProject,
  };
};

const mapDispatchToProps = {
  addListing,
  updateSPV,
  updateProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(StepperAddListing);
