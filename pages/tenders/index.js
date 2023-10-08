// import React, { Component } from "react";
// import Navbar from "../../components/Layouts/Navbar";
// import PageBanner from "../../components/Common/PageBanner";
// import Footer from "../../components/Layouts/Footer";
// import AllTenders from "../../components/TenderListings/AllListings";

// class Tenders extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <Navbar />
//         <AllTenders />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default Tenders;

import moment from "moment-timezone";
import { useEffect, useState } from "react";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import {
  Box,
  Grid,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";

const Tenders = () => {
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const url = `http://localhost:3000/api/tenders?page=${page}`;

  const currentDate = moment().tz("Asia/Baghdad").format("MM/DD/YYYY HH:mm:ss");

  const getApiData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) =>setArr(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApiData();
  }, [page]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <br />
        <br />
        <center>
          <Typography style={{ fontSize: "2rem" }}>
            <b>Available Tenders</b>
          </Typography>
        </center>
        <br />
        <hr />
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Typography>
              <b>Date Added</b>
            </Typography>
          </Grid>
          <Grid item md={8}>
            <Typography>
              <b>Tender Details</b>
            </Typography>
          </Grid>
          <Grid item md={2}>
            <Typography>
              <b>Expires</b>
            </Typography>
          </Grid>
        </Grid>
        <hr />
        {arr &&
          arr.map((item, index) => {
            return (
              <Box key={index}>
                <Grid container spacing={2}>
                  <Grid item md={2}>
                    <Typography>
                      <b>
                        <span>{moment(item.createdAt).format("DD")}</span>
                        &nbsp;
                        <span>{moment(item.createdAt).format("MMM")}</span>
                        &nbsp;
                        <span>{moment(item.createdAt).format("YYYY")}</span>
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <a href={`/tenders/${item.slug}`}>
                      <Typography>{item.tenderTitle}</Typography>
                    </a>
                  </Grid>
                  <Grid item md={2}>
                    <div
                      className={`days-until-expiration${
                        moment(item.dueDate).isSameOrBefore(currentDate, "day")
                          ? " expiration-red"
                          : ""
                      }`}
                    >
                      {(moment(item.dueDate).isSameOrBefore(currentDate, "day")
                        ? moment(item.dueDate).format("YYYYMMDD") ===
                          moment(currentDate).format("YYYYMMDD")
                          ? "Today"
                          : "Expired"
                        : item.dueDate &&
                          moment(item.dueDate).diff(
                            moment(currentDate),
                            "days"
                          ) + " days") || ""}
                    </div>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        <br />
        <br />
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {page < 2 ? (
            <></>
          ) : (
            <IconButton
              onClick={() => {
                setPage(page - 1);
                setArr([]);
              }}
            >
              <ArrowBack />
            </IconButton>
          )}
          &nbsp; &nbsp; &nbsp; &nbsp;
          <Typography>
            <b>Page - {page}</b>
          </Typography>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <IconButton
            onClick={() => {
              setPage(page + 1);
              setArr([]);
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
        <br />
      </Container>
      <Footer />
    </>
  );
};

export default Tenders;
