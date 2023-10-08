import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getNewBySlug } from "../../redux/actions/news";
import Image from "next/image";

const ReactMarkdown = require("react-markdown/with-html");

const ArticleDetailComponent = (props) => {
  const [dataPage, setDataPage] = useState(null);

  useEffect(() => {
    props.getNewBySlug(props.articleId);
  }, [props.getNewBySlug, props.articleId]);

  useEffect(() => {
    setDataPage(props.detailPage);
  }, [props.detailPage]);

  return (
    <div className="article-page">
      <div className="container article-content">
        <div className="article-title">
          <h2>{(dataPage && dataPage.title) || ""}</h2>
          <br />
        </div>
        <p>
          {moment(dataPage && dataPage.releasedDate).format(
            "MMMM Do YYYY",
            "x"
          )}
        </p>
        <hr></hr>
        <div className="row">
          <div className="col-7">
            {dataPage && dataPage.editorHtml && (
              <div className="ql-editor" style={{ padding: 0 }}>
                <ReactMarkdown
                  escapeHtml={false}
                  source={dataPage && dataPage.editorHtml}
                />
              </div>
            )}{" "}
          </div>
          <div className="col-5 px-5 mt-3">
            {" "}
            <div className="adarticle">
              {/* <input
                type="file"
                id="banner-ad"
                accept="image/*"
                style={{ display: "none" }}
              />
              <label for="banner-ad">
                <span>Advertizing space here within every news article</span>
              </label> */}
               <Image width={1000} height={1000}
                className=""
                src="/noimage.png"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    detailPage: store.news.newDetailSlug,
  };
};

const mapDispatchToProps = {
  getNewBySlug,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailComponent);
