import { Button, Grid } from "@material-ui/core";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDetailTender } from "../../redux/actions/tender";

const RequiredUser = (props) => {
  const router = useRouter();
  console.log(props)
  useEffect(() => {
    props.getDetailTender(router.query.slug);
  }, []);
  return (
    <div className="required-user">
      <div className="container user-register-alert">
        {props.isLogin ? (
          <div className="trial-expired">
            <h3>
              Your trial plan has expired. Please subscribe to a paid plan to
              continue.
            </h3>
            <br />
            <a
              style={{ marginTop: 35 }}
              className="default-btn"
              href="/pricing"
            >
              Select plan now
            </a>
          </div>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <div className="add-title">
                <h2>{props.tender && props.tender.tenderTitle}</h2>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <div className="add-category">
                <p>Date Added</p>
                <p className="font-bold">
                  {props.tender &&
                    moment(props.tender.createdAt).format("DD MMM YYYY")}
                </p>

                <p>Deadline Date</p>
                <p className="font-bold">
                  {props.tender &&
                    moment(props.tender.dueDate).format("DD MMM YYYY")}
                </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="edit-pl20">
                <h3>Log in required</h3>
                <p>
                  To view this tender information you must be a member of the
                  website and log in.
                </p>
                <a className="default-btn" href="/login">
                  Login
                </a>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="edit-bacground">
                <h3>Not a member?</h3>
                <p>
                  Rebuilding Iraq is the leading Tender, Project and News Alert
                  Service for Iraq. <Link legacyBehavior href="/sign-up">Sign up</Link> now and
                  get access to all of this and more.
                </p>
                <ul>
                  <li> Daily email alert</li>
                  <li> Access tenders and projects</li>
                  <li> Multiple user accounts</li>
                  <li> Individual alert profiles</li>
                  <li> Publish your own contracts</li>
                  <li> Access sales leads</li>
                  <li> Market your business</li>
                </ul>
                <a
                  variant="contained"
                  className="default-btn  default-btn-red"
                  href="/sign-up"
                >
                  IT'S FREE
                </a>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

// export default RequiredUser;
const mapStateToProps = (store) => {
  return {
    tender: store.tender.tender,
  };
};

const mapDispatchToProps = {
  getDetailTender,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequiredUser);
