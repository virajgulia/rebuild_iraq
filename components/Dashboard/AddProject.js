import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
// import { getAllUsers } from "../../redux/actions/user";
import { deleteProject } from "../../redux/actions/project";
import { deleteAsset } from "../../redux/actions/asset";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "next/image";

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      operator: "",
      // types: ["Production", "Exploratory", "Equipment"],
      typesAsset: ["Production", "Exploratory", "Structures/equipment"],
      typesEnergy: [{ name: "Oil", image: "oil.svg" }, { name: "Gas", image: "gas.png" }, { name: "Solar", image: "solar.svg" }, { name: "Wind", image: "wind.png" }, { name: "Nuclear", image: "nuclear.svg" }],
      // type: "",
      fileDocument0: [],
      fileConfidential0: [],
      arrListAsset0: [],
      arrIndexProject: this.props.listingDetail ? [] : [0],
      arrIndexAsset0: [],
      openDelete: false,
      loading: false,
    };
  }

  componentDidMount = async () => {
    // await this.props.getAllUsers();
    if (this.props.listingDetail) {
      const { listingDetail } = this.props;
      if (listingDetail.listProject.length > 0) {
        let arrIndexProject = [];
        listingDetail.listProject.forEach(async (project, i) => {
          arrIndexProject.push(i);
          await this.setState({
            [`nameProject${i}`]: project.name,
            // [`country${i}`]: project.country,
            // [`state${i}`]: project.state,
            [`owner${i}`]: project.owner,
            [`operator${i}`]: project.operator,
            // [`type${i}`]: project.type,
            [`description${i}`]: project.description,
            [`onChangeUploadDocument${i}`]: false,
            [`onChangeUploadConfidential${i}`]: false,
            [`onChangeUploadImage${i}`]: false,
            [`image${i}`]: project.image.filename,
            [`imageProject${i}`]: project.image,
            [`fileDocument${i}`]: project.projectsDocument,
            [`fileConfidential${i}`]: project.confidential,
            [`idProject${i}`]: project._id,
          });
          if (project.listAsset.length > 0) {
            let arrIndexAsset = [];
            project.listAsset.forEach(async (asset, index) => {
              arrIndexAsset.push(index);
              await this.setState({
                [`nameAsset${index}${i}`]: asset.name,
                [`typeAsset${index}${i}`]: asset.type,
                [`typeEnergy${index}${i}`]: asset.energyType,
                // [`operatorAsset${index}${i}`]: asset.operator._id,
                [`idAsset${index}${i}`]: asset._id,
              });
            });
            await this.setState({
              [`arrIndexAsset${i}`]: arrIndexAsset,
            });
          } else {
            await this.setState({
              [`arrIndexAsset${i}`]: [],
            });
          }
        });
        await this.setState({
          arrIndexProject: arrIndexProject,
        });
      }
    }
  };

  handleChangeSelect = (name, event, i) => {
    this.setState({ [`${name}${i}`]: event.target.value });
  };
  handleChangeSelectAsset = (name, event, asset, i) => {
    this.setState({ [`${name}${asset}${i}`]: event.target.value });
  };

  onChange = async (name, i) => {
    await this.setState({ [`${name}${i}`]: event.target.value });
    // if(!this.props.listingDetail && localStorage.getItem("isBack")){
    //   localStorage.setItem([`${name}${i}`], this.state[`${name}${i}`])
    // }
  };

  onChangeAsset = async (name, asset, i) => {
    await this.setState({ [`${name}${asset}${i}`]: event.target.value });
  };

  // selectCountry = (val, i) => {
  //   this.setState({ [`country${i}`]: val });
  // };

  // selectRegion = (val, i) => {
  //   this.setState({ [`state${i}`]: val });
  // };

  changeUploadFile = async (e, i) => {
    const dataFile = e.target.files;
    const fileDocument = this.state[`fileDocument${i}`];
    if (dataFile.length > 0) {
      for (let i = 0; i < dataFile.length; i++) {
        fileDocument.push(dataFile[i]);
      }
      this.setState({
        [`onChangeUploadDocument${i}`]: true,
      });
    }
    await this.setState({ [`fileDocument${i}`]: fileDocument });
  };

  changeUploadFileConfidential = async (e, i) => {
    const fileConfidential = this.state[`fileConfidential${i}`];
    const dataFile = e.target.files;
    if (dataFile.length > 0) {
      for (let i = 0; i < dataFile.length; i++) {
        fileConfidential.push(dataFile[i]);
      }
    }
    await this.setState({ [`fileConfidential${i}`]: fileConfidential });
  };

  changeUpload = async (e, i) => {
    const dataFile = e.target.files;
    if (dataFile.length > 0) {
      let reader = new FileReader();
      let url = reader.readAsDataURL(dataFile[0]);
      reader.onloadend = function (e) {
        this.setState({
          [`image${i}`]: [reader.result],
          [`onChangeUploadImage${i}`]: true,
        });
      }.bind(this);
      await this.setState({ [`imageProject${i}`]: dataFile[0] });
    }
  };

  removeSelectFile = async (name, isProps, i) => {
    const fileDocument = this.state[`fileDocument${i}`];
    let filtered = fileDocument.filter((e) =>
      !isProps ? e.name !== name : e.originalname !== name
    );
    await this.setState({ [`fileDocument${i}`]: filtered });
  };

  removeSelectFileConfidential = async (name, isProps, i) => {
    const fileConfidential = this.state[`fileConfidential${i}`];
    let filtered = fileConfidential.filter((e) =>
      !isProps ? e.name !== name : e.originalname !== name
    );
    await this.setState({ [`fileConfidential${i}`]: filtered });
  };

  addAnotherProject = async () => {
    const { arrIndexProject } = this.state;
    let index = 0;
    if (arrIndexProject.length !== 0) {
      index = arrIndexProject[arrIndexProject.length - 1] + 1;
    }
    arrIndexProject.push(index);
    await this.setState({
      [`fileDocument${index}`]: [],
      [`fileConfidential${index}`]: [],
      [`arrIndexAsset${index}`]: [],
      [`arrListAsset${index}`]: [],
    });
    await this.setState({ arrIndexProject });
    await this.setState({
      [`onChangeUploadImage${arrIndexProject.length - 1}`]: true,
    });
  };

  addAnotherAsset = async (projectId) => {
    const arrIndexAsset = this.state[`arrIndexAsset${projectId}`];
    let index = 0;
    if (arrIndexAsset.length !== 0) {
      index = arrIndexAsset[arrIndexAsset.length - 1] + 1;
    }
    arrIndexAsset.push(index);
    await this.setState({ arrIndexAsset });
  };

  removeProject = async (index) => {
    const { arrIndexProject } = this.state;
    const pos = arrIndexProject.indexOf(index);
    if (pos > -1) {
      arrIndexProject.splice(pos, 1);
    }
    await this.setState({ arrIndexProject });
  };

  deleteProject = async (id, index) => {
    this.setState({
      idDeleteProject: id,
      indexProject: index,
      typeDelete: "project",
    });
    this.handleClickOpen();
  };

  deleteAsset = async (id, asset, index) => {
    this.setState({
      idDeleteAsset: id,
      indexAsset: asset,
      indexProAsset: index,
      typeDelete: "asset",
    });
    this.handleClickOpen();
  };

  handleDeleteProject = async () => {
    await this.props.deleteProject(this.state.idDeleteProject);
    this.removeProject(this.state.indexProject);
    this.setState({ [`idProject${this.state.indexProject}`]: undefined });
    this.handleClose();
  };

  handleDeleteAsset = async () => {
    await this.props.deleteAsset(this.state.idDeleteAsset);
    this.removeAsset(this.state.indexAsset, this.state.indexProAsset);
    this.setState({
      [`idAsset${this.state.indexAsset}${this.state.indexProAsset}`]: undefined,
    });
    this.handleClose();
  };

  removeAsset = async (asset, i) => {
    const arrIndexAsset = this.state[`arrIndexAsset${i}`];
    const pos = arrIndexAsset.indexOf(asset);
    if (pos > -1) {
      arrIndexAsset.splice(pos, 1);
    }
    await this.setState({ [`arrIndexAsset${i}`]: arrIndexAsset });
  };

  handleFinish = async () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    const { arrIndexProject } = this.state;
    const arrListProject = [];
    let isError = false;
    if (arrIndexProject.length > 0) {
      arrIndexProject.forEach(async (item, index) => {
        if (
          this.state[`nameProject${item}`] &&
          // this.state[`country${item}`] &&
          // this.state[`state${item}`] &&
          this.state[`owner${item}`] &&
          this.state[`operator${item}`] &&
          // this.state[`type${item}`] &&
          this.state[`description${item}`] &&
          this.state[`imageProject${item}`]
        ) {
          const arrIndexAsset = this.state[`arrIndexAsset${item}`];
          const arrListAsset = [];
          arrIndexAsset.map((asset, index) => {
            if (
              this.state[`typeAsset${asset}${item}`] &&
              this.state[`typeEnergy${asset}${item}`] &&
              // this.state[`operatorAsset${asset}${item}`] &&
              this.state[`nameAsset${asset}${item}`]
            ) {
              const assetObject = {
                name: this.state[`nameAsset${asset}${item}`],
                type: this.state[`typeAsset${asset}${item}`],
                energyType: this.state[`typeEnergy${asset}${item}`]
                // operator: this.state[`operatorAsset${asset}${item}`],
              };
              if (this.props.listingDetail) {
                if (this.state[`idAsset${asset}${item}`]) {
                  assetObject.id = this.state[`idAsset${asset}${item}`];
                } else {
                  assetObject.id = undefined;
                }
              }
              arrListAsset.push(assetObject);
            } else {
              toast.error(
                `Please fill all the filed of Number ${index + 1} Asset`
              );
              isError = true;
            }
          });
          await this.setState({ [`arrListAsset${item}`]: arrListAsset });
          const project = {
            name: this.state[`nameProject${item}`],
            // type: this.state[`type${item}`],
            owner: this.state[`owner${item}`],
            operator: this.state[`operator${item}`],
            description: this.state[`description${item}`],
            // country: this.state[`country${item}`],
            // state: this.state[`state${item}`],
            listAsset: this.state[`arrListAsset${item}`],
            projectsDocument: this.state[`fileDocument${item}`],
            confidential: this.state[`fileConfidential${item}`],
            image: this.state[`imageProject${item}`],
          };
          if (this.props.listingDetail) {
            if (this.state[`idProject${item}`]) {
              project.id = this.state[`idProject${item}`];
            } else {
              project.id = undefined;
              project.spvId = this.props.listingDetail._id;
            }
          }
          arrListProject.push(project);
        } else {
          toast.error(
            `Please fill all the filed of Number ${index + 1} Project`
          );
          isError = true;
        }
      });
      if (!isError) {
        this.props.passDataOfProject(arrListProject);
      } else {
        this.setState({ loading: false });
      }
    } else {
      this.props.passDataOfProject([]);
    }
    localStorage.removeItem("dataSPV");
  };

  handleClickOpen = () => {
    this.setState({ openDelete: true });
  };

  handleClose = () => {
    this.setState({ openDelete: false });
  };

  render() {
    const {
      arrIndexProject,
      typesAsset,
      typesEnergy,
      openDelete,
      typeDelete,
      loading,
    } = this.state;
    const { users, listingDetail } = this.props;
    return (
      <div className="project-information">
        <div>
          <Dialog
            open={openDelete}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {typeDelete && typeDelete === "project"
                ? "Are you sure delete this project?"
                : "Are you sure delete this asset?"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={
                  typeDelete && typeDelete === "project"
                    ? this.handleDeleteProject
                    : this.handleDeleteAsset
                }
                color="primary"
                autoFocus
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <h3>Project Information</h3>
        {arrIndexProject.map((i, key) => (
          <div key={key} className="item-project">
            <div
              className="remove-project"
              onClick={() => {
                this.state[`idProject${i}`]
                  ? this.deleteProject(this.state[`idProject${i}`], i)
                  : this.removeProject(i);
              }}
            >
              X
            </div>
            <TextField
              required
              label="Name"
              style={{ width: "30%" }}
              value={
                this.state[`nameProject${i}`]
                  ? this.state[`nameProject${i}`]
                  : ""
              }
              onChange={() => this.onChange("nameProject", i)}
            />
            {/* <CountryDropdown
              value={this.state[`country${i}`]}
              onChange={(val) => this.selectCountry(val, i)}
            />
            <RegionDropdown
              disableWhenEmpty={true}
              title="Please select country  before select state"
              country={this.state[`country${i}`]}
              value={this.state[`state${i}`]}
              onChange={(val) => this.selectRegion(val, i)}
            /> */}
            <TextField
              required
              label="Owner"
              style={{ width: "30%" }}
              value={this.state[`owner${i}`] ? this.state[`owner${i}`] : ""}
              onChange={() => this.onChange("owner", i)}
            />
            <TextField
              required
              label="Operator"
              style={{ width: "30%" }}
              value={
                this.state[`operator${i}`] ? this.state[`operator${i}`] : ""
              }
              onChange={() => this.onChange("operator", i)}
            />
            {/* <FormControl required>
              <InputLabel id="demo-simple-select-required-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={this.state[`type${i}`] ? this.state[`type${i}`] : ""}
                onChange={(event) => this.handleChangeSelect("type", event, i)}
              >
                {types &&
                  types.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl> */}
            <TextField
              className="full"
              style={{ width: "80%" }}
              required
              id="standard-multiline-flexible standard-required"
              label="Description"
              multiline
              value={
                this.state[`description${i}`]
                  ? this.state[`description${i}`]
                  : ""
              }
              rowsMax={10}
              onChange={() => this.onChange("description", i)}
            />
            <FormControl className="specially">
              <div className="file-information">
                <span>Upload Image *</span>
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => this.changeUpload(e, i)}
                />
              </div>
              {this.state[`image${i}`] &&
                this.state[`onChangeUploadImage${i}`] && (
                  <Image width={0} height={0}
                    style={{ width: "85%", height: 150 }}
                    src={this.state[`image${i}`]}
                  />
                )}
              {listingDetail &&
                listingDetail.listProject &&
                listingDetail.listProject.length > 0 &&
                !this.state[`onChangeUploadImage${i}`] && (
                  <Image width={0} height={0}
                    style={{ width: "85%", height: 150 }}
                    src={this.state[`imageProject${i}`] && this.state[`imageProject${i}`].location}
                  />
                )}
            </FormControl>
            <FormControl className="specially">
              <div className="file-information">
                <span>Public Files *</span>
                <input
                  accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, .zip"
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e) => this.changeUploadFile(e, i)}
                />
              </div>

              {this.state[`fileDocument${i}`].map((file, index) => (
                <div className="item-file" key={index}>
                  <p>{file.name ? file.name : file.originalname}</p>
                  <h3
                    onClick={() =>
                      this.removeSelectFile(
                        file.name ? file.name : file.originalname,
                        file.name ? false : true,
                        i
                      )
                    }
                  >
                    x
                  </h3>
                </div>
              ))}
            </FormControl>
            {/* <FormControl className="specially">
              <div className="file-information">
                <span>Confidential Files *</span>
                <input
                  accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf, .zip" 
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={(e) => this.changeUploadFileConfidential(e, i)}
                />
              </div>
              {this.state[`fileConfidential${i}`].map((file, index) => (
                <div className="item-file" key={index}>
                  <p>{file.name ? file.name : file.originalname}</p>
                  <h3
                    onClick={() =>
                      this.removeSelectFileConfidential(
                        file.name ? file.name : file.originalname,
                        file.name ? false : true,
                        i
                      )
                    }
                  >
                    x
                  </h3>
                </div>
              ))}
            </FormControl> */}
            <div className="list-asset">
              <h5>Asset Information</h5>
              {this.state[`arrIndexAsset${i}`] &&
                this.state[`arrIndexAsset${i}`].map((asset, keyAsset) => (
                  <div key={keyAsset} className="asset-information">
                    <div
                      className="remove-project remove-asset"
                      onClick={() => {
                        this.state[`idAsset${asset}${i}`]
                          ? this.deleteAsset(
                            this.state[`idAsset${asset}${i}`],
                            asset,
                            i
                          )
                          : this.removeAsset(asset, i);
                      }}
                    >
                      X
                    </div>
                    <TextField
                      required
                      label="Asset Name"
                      value={
                        this.state[`nameAsset${asset}${i}`]
                          ? this.state[`nameAsset${asset}${i}`]
                          : ""
                      }
                      onChange={() => this.onChangeAsset("nameAsset", asset, i)}
                    />
                    <FormControl required>
                      <InputLabel id="demo-simple-select-required-label">
                        Asset Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={
                          this.state[`typeAsset${asset}${i}`]
                            ? this.state[`typeAsset${asset}${i}`]
                            : ""
                        }
                        onChange={(event) =>
                          this.handleChangeSelectAsset(
                            "typeAsset",
                            event,
                            asset,
                            i
                          )
                        }
                      >
                        {typesAsset &&
                          typesAsset.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl required>
                      <InputLabel>
                        Energy Type
                      </InputLabel>
                      <Select
                        value={
                          this.state[`typeEnergy${asset}${i}`]
                            ? this.state[`typeEnergy${asset}${i}`]
                            : ""
                        }
                        onChange={(event) =>
                          this.handleChangeSelectAsset(
                            "typeEnergy",
                            event,
                            asset,
                            i
                          )
                        }
                      >
                        {typesEnergy &&
                          typesEnergy.map((item, index) => (
                            <MenuItem key={index} value={item.name}>
                              {/* <Image width={0} height={0} src=`../../images/spv/${item.image}`)} alt="Image" style={{width: 18, marginRight: 9}} /> */}
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>

                    <hr />
                  </div>
                ))}
              <div className="add-another save-asset">
                {/* <span onClick={() => this.addAnotherAsset(i)}>
                  {" "}
                  (+) Add An Asset
                </span> */}
                <Button
                  variant="contained"
                  className="add-asset-btn"
                  onClick={() => this.addAnotherAsset(i)}
                >
                  Add An Asset
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="add-another save-asset">
          <span onClick={this.addAnotherProject}> (+) Add Another Project</span>
        </div>
        <div className="btn-stepper">
          <Button
            variant="contained"
            className="btn-custom"
            color="primary"
            onClick={this.props.handleBack}
          >
            Back
          </Button>
          <div className="btn-finnish">
            <Button
              variant="contained"
              className="btn-custom"
              color="primary"
              disabled={loading}
              onClick={this.handleNext}
            >
              Next
            </Button>
            {loading && <CircularProgress size={24} />}
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    // users: store.user.users,
  };
};

const mapDispatchToProps = {
  // getAllUsers,
  deleteProject,
  deleteAsset,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
