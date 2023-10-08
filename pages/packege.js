import React, { Component } from "react";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
class Packege extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />

        <div className="p-5 w-75" style={{ margin: "auto" }}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    FREE
                    <br /> $0 only 2 days
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    BRONZE <br /> $99 per month
                  </TableCell>
                  <TableCell
                    align="center"
                    className="single-pricing"
                    style={{ fontWeight: "bolder" }}
                  >
                    <div>
                      SILVER <br /> $199 per month
                      <strong className="popular">Popular</strong>
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    GOLD <br /> $399 per month
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Users
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    1
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    1
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    3
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bolder" }}>
                    10
                  </TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Daily Iraq update
                  </TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}}  /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Access news, jobs & events
                  </TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    List in procurement directory
                  </TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Bespoke tender alert service
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Access all tender information{" "}
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Access sales leads{" "}
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Marketing / advertising services{" "}
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Premium procurement listing{" "}
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Business development services
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    Access Project Information
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
                <TableRow style={{ backgroundColor: "#8885" }}>
                  <TableCell align="right" style={{ fontWeight: "bolder" }}>
                    24/7 support service
                  </TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CloseIcon style={{color: 'red'}} /></TableCell>
                  <TableCell align="center"><CheckIcon style={{color: 'green'}} /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginBottom: 20, marginTop: 20, float: 'right' }}>
              <a href={`/sign-up`} target="_self">
                <button
                  type="button"
                  className={`default-btn btn-two`}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <span style={{ marginTop: 7, marginLeft: 20 }}>
                    Continue Sign Up
                  </span>
                  <span style={{ marginLeft: 20 }}>
                    <ArrowForwardIcon />
                  </span>
                </button>
              </a>
            </div>
        </div>
        <div style={{marginTop:50}}>
            <Footer />
        </div>
        
      </React.Fragment>
    );
  }
}

export default Packege;
