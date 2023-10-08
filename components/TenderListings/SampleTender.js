import moment from "moment";
import DOMPurify from "dompurify";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";

const TenderListing = ({ tender }) => {
  const [clean, setclean] = useState("");

  useEffect(() => {
    const input = tender?.tender.tenderDetail || "";

    const regex = /<span[^>]*>(.*?)<\/span>/g;
    const output = input.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

    const cleanedHTML = output.replace(regex, "$1");
    const freshData = DOMPurify.sanitize(cleanedHTML);

    setclean(freshData);
  }, [tender]);

  return (
    <div className="all-tenders-page">
      <div className="container all-tenders-content">
        <div style={{ textAlign: "center" }}>
          <h4>{(tender && tender.tender.tenderTitle) || ""}</h4>
        </div>
        <hr></hr>

        <div className="panel-card">
          <p>
            <strong>
              Date Posted:{" "}
              {tender &&
                tender.tender.createdAt &&
                moment(tender.tender.createdAt).format("MM/DD/YYYY")}
            </strong>
          </p>
          <p>
            <strong>
              Deadline:{" "}
              {tender &&
                tender.tender.dueDate &&
                moment(tender.tender.dueDate).format("MM/DD/YYYY")}
            </strong>
          </p>
        </div>

        <div className="tender-listing-more-info">
          <h5>Company Details</h5>
          <h6>
            {(tender && tender.tender.company && tender.tender.company.name) ||
              ""}
          </h6>
          <hr></hr>
          <p>
            Company Website:{" "}
            {(tender &&
              tender.tender.company &&
              tender.tender.company.website) ||
              ""}
          </p>
          <p>
            Company Email:{" "}
            {(tender && tender.tender.company && tender.tender.company.email) ||
              ""}
          </p>
          <p>
            Telephone Number:{" "}
            {(tender && tender.tender.company && tender.tender.company.phone) ||
              ""}
          </p>
        </div>

        <div className="tender-listing-more-info">
          <h5>Point of Contact</h5>
          <hr></hr>
          <p>
            Name:{" "}
            {(tender &&
              tender.tender.contact &&
              tender.tender.contact.firstName) ||
              ""}{" "}
            {(tender &&
              tender.tender.contact &&
              tender.tender.contact.lastName) ||
              ""}
          </p>
          <p>
            Email:{" "}
            {(tender && tender.tender.contact && tender.tender.contact.email) ||
              ""}
          </p>
          <p>
            Telephone Number:{" "}
            {(tender &&
              tender.tender.contact &&
              tender.tender.contact.phoneNumber) ||
              ""}
          </p>
        </div>

        <div className="tender-listing-more-info">
          <h5>Tender Details</h5>
          <hr></hr>

          <span
            dangerouslySetInnerHTML={{
              __html: clean,
            }}
          />
        </div>

        <div
          className="panel-card"
          style={{
            background: "rgb(242, 242, 242)",
            border: "1px solid rgb(216, 216, 216)",
          }}
        >
          <h5>Additional Documents</h5>
          {tender && tender.tender.tenderURL ? (
            <a
              style={{ fontSize: 16 }}
              href={(tender && tender.tender.tenderURL) || ""}
              target="_blank"
            >
              View Documents
            </a>
          ) : (
            <a style={{ fontSize: 16 }} target="_blank">
              No Documents
            </a>
          )}
        </div>

        <div className="tender-listing-more-info">
          <h5>Category</h5>

          {tender &&
            tender.tender.categories &&
            tender.tender.categories.length > 0 &&
            tender.tender.categories.map((item, i) => (
              <p key={i}>
                <a href={`categories/${item._id}`}>{item.title}</a>
              </p>
            ))}
        </div>

        <br></br>

        <Button variant="contained" color="primary">
          <a style={{ color: "white" }} href="/tenders">
            Back
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TenderListing;
