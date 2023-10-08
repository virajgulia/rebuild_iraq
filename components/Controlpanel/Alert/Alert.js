import React, { useState, useEffect } from "react";
import Link from "../../../utils/ActiveLink";
const styleObject = {
  link: {
    textDecoration: "underline",
  },
};
const Alert = () => {
  return (
    <>
      <div className="container">
        <div className=" row" style={{ marginBottom: 50 }}>
          <div className="col-lg-4 col-md-12 cardMarginSection">
            <div className="card">
              <div className="card-header">
                <p>Tenders</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item py-4">
                  <div className="text-center">
                    <button className="btn btn-success">
                      Tender alerts are ON
                    </button>
                  </div>
                </li>
                <li className="list-group-item py-3">
                  <div className="text-center">
                    <button className="btn btn-danger p-3">Turn Off</button>
                  </div>
                </li>
                <li className="list-group-item">
                  <div>
                    <span>(45) Categories - </span>
                    <Link legacyBehavior href="./TenderCategories">
                      <span style={styleObject.link}>manage</span>
                    </Link>
                  </div>
                  <div>
                    <span>(6) Location - </span>
                    <Link legacyBehavior href="./TenderLocation" className="border-bottom">
                      <span style={styleObject.link}>manage</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 cardMarginSection">
            <div className="card">
              <div className="card-header">
                <p>News</p>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item py-4">
                  <div className="text-center">
                    <button className="btn btn-success">
                      News alerts are ON
                    </button>
                  </div>
                </li>
                <li className="list-group-item py-3">
                  <div className="text-center">
                    <button className="btn btn-danger p-3">Turn Off</button>
                  </div>
                </li>
                <li className="list-group-item">
                  <span>(16) Categories - </span>
                  <Link legacyBehavior href="./NewsCategories">
                    <span style={styleObject.link}>manage</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Alert;
