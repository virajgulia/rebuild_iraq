import React, { Component } from "react";
import { useRouter } from 'next/router'

import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import ArticleDetailComponent from "../../components/Article/Detail";

const MediaDetail = () => {
  const router = useRouter()
  const { articleId } = router.query

  return (
    <React.Fragment>
      <Navbar />
      <ArticleDetailComponent articleId={articleId} />
      <Footer />
    </React.Fragment>
  );
};

export default MediaDetail;
