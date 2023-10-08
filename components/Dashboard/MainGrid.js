import React, { Component, useState } from "react";

const MainGrid = (props) => {
  return (
    <section>
      <hr></hr>
      <h4>Services</h4>
      <div className="grid-view">
        <div className="column">
          <div className="subheader">
            <h4>Tenders</h4>
          </div>
          <div className="panel-card">
            <ul>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("addTender")}
                >
                  Add Tender
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("listAllTenders")}
                >
                  List all Tenders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("tenderCategories")}
                >
                  Tender Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("tenderCompanies")}
                >
                  Tender Companies
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("tenderContacts")}
                >
                  Tender Contacts
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="column">
          <div className="subheader">
            <h4>News</h4>
          </div>
          <div className="panel-card">
            <ul>
              <li>
                <a href="#" onClick={props.openAddNew}>
                  Add News Article
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("listAllNews")}
                >
                  List all News
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => props.selectedComponent("manageUser")}
                >
                  Manage User
                </a>
              </li>
              {/* <li><a href="#">News Categories</a></li> */}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 50 }}>
        <hr></hr>
        <h4>Membership</h4>
      </div>
    </section>
  );
};

export default MainGrid;
