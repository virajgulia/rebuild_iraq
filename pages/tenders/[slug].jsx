import React, { useState, useEffect } from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import SampleTender from "../../components/TenderListings/SampleTender";

import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getDetailTender } from "../../redux/actions/tender";
import RequiredUser from "../../components/RequiredUser";

const TenderDetail = (props) => {
  const router = useRouter();
  console.log(props)

  useEffect(() => {
    props.getDetailTender(router.query.slug);
  }, [router.query.slug]);

  return (
    <React.Fragment>
      <Navbar />
      {props.requestChangePlan ? (
        <RequiredUser isLogin={props.isLogined} />
      ) : (
        <SampleTender tender={props.tender} />
      )}

      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (store) => {
  return {
    tender: store.tender.tender,
    requestChangePlan: store.tender.requestChangePlan,
    isLogined: store.tender.isLogined,
    planName: store.tender.planName,
    msgError: store.tender.msgError,
    profile: store.user.profile,
  };
};

const mapDispatchToProps = {
  getDetailTender,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenderDetail);
