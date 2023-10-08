import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  getAllCategories,
  getAllCategoriesNoSubcategory,
} from "../../../redux/actions/category";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import DOMPurify from "dompurify";

const Review = (props) => {
  const [clean, setclean] = useState("");
  useEffect(() => {
    const freshData = DOMPurify.sanitize(props.allValues.tenderDetails);
    setclean(freshData);
  }, [props.allValues.tenderDetails]);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [treeCategories, setTreeCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const categoryArray = props.allValues.selectedCategories;

  const listCategory = categoryArray.map((categoryArray, i) => (
    <li key={i}>{categoryArray}</li>
  ));

  useEffect(() => {
    props.getAllCategoriesNoSubcategory();
  }, []);

  useEffect(() => {
    // dont remove ok function 
    const ok = async () => {
      await setChecked(props.allValues.selectedCategories);
      await handleGetNameCategories(props.allValues.selectedCategories);

    }
    ok()
  }, [props.allValues.selectedCategories, props.categories]);

  useEffect(() => {
    if (props.categories && props.categories.length > 0) {
      const treeData = [];
      for (let i = 0; i < props.categories.length; i++) {
        const item = props.categories[i];
        const obj = {
          value: item._id,
          label: item.title,
        };
        if (item.subCategories && item.subCategories.length > 0) {
          const children = [];
          for (let j = 0; j < item.subCategories.length; j++) {
            const el = item.subCategories[j];
            const subObj = {
              value: el._id,
              label: el.title,
            };
            children.push(subObj);
          }
          obj.children = children;
        }

        treeData.push(obj);
      }

      setTreeCategories(treeData);
      setNodes(treeData);
    }
  }, [props.categories]);

  useEffect(() => {
    props.allValues.storeCompanyInDatabase;
    props.allValues.storeContactInDatabase;
  }, [
    props.allValues.storeCompanyInDatabase,
    props.allValues.storeContactInDatabase,
  ]);

  const handleSelected = (checked) => {
    setChecked(checked);
    props.updateValues(checked);
  };

  const handleGetNameCategories = async (ids) => {
    const list = [];
    for (let i = 0; i < props.categories.length; i++) {
      const cate = props.categories[i];
      if (ids.indexOf(cate._id) > -1) {
        list.push(cate);
      }
    }
    await setCategoriesSelected(list);
  };

  return (
    <div className="spv-information">
      <h3>Review</h3>
      <hr></hr>

      <div className="grid-view">
        <div className="column" style={{ width: "100%" }}>
          <div
            className="panel-card"
            style={{ backgroundColor: "#f2f2f2", border: "1px solid #d8d8d8" }}
          >
            <h3>Basic Tender Info</h3>
            <div>
              <p>
                <strong>Title:</strong> {props.allValues.tenderTitle}
              </p>
            </div>

            <div>
              <p>
                <strong>Tender Value:</strong> {props.allValues.tenderValue}
              </p>
            </div>

            <div>
              <p>
                <strong>Details:</strong>
                <span
                  dangerouslySetInnerHTML={{
                    __html: clean,
                  }}
                />
              </p>
            </div>

            <div>
              <p>
                <strong>Documents URL:</strong> {props.allValues.documentsURL}
              </p>
            </div>

            <hr></hr>

            <h3>Company Info</h3>
            <div>
              <p>
                <strong>Company Name:</strong> {props.allValues.companyName}
              </p>
            </div>

            <div>
              <p>
                <strong>Company Email:</strong> {props.allValues.companyEmail}
              </p>
            </div>

            <div>
              <p>
                <strong>Country:</strong> {props.allValues.companyCountry}
              </p>
            </div>

            <div>
              <p>
                <strong>Company Website:</strong>{" "}
                {props.allValues.companyWebsite}
              </p>
            </div>

            <div>
              <p>
                <strong>Phone Number:</strong>{" "}
                {props.allValues.companyPhoneNumber}
              </p>
            </div>

            <hr></hr>

            <h3>Point of Contact</h3>
            <div>
              <p>
                <strong>First Name: </strong> {props.allValues.firstName}
              </p>
            </div>

            <div>
              <p>
                <strong>Last Name: </strong> {props.allValues.lastName}
              </p>
            </div>

            <div>
              <p>
                <strong>Email: </strong> {props.allValues.email}
              </p>
            </div>

            <div>
              <p>
                <strong>Job Title: </strong> {props.allValues.jobTitle}
              </p>
            </div>

            <div>
              <p>
                <strong>Phone Number: </strong> {props.allValues.phoneNumber}
              </p>
            </div>

            <hr></hr>

            <h3>Tender Categories</h3>

            <div>
              {categoriesSelected &&
                categoriesSelected.length > 0 &&
                categoriesSelected.map((cate, i) => (
                  <div key={i}>{cate.title}</div>
                ))}
            </div>

            <hr></hr>

            <h3>Due Date</h3>
            <div>
              <p>{props.allValues.dueDate} (GMT+3) Arabian Standard Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    categories: store.category.categories_noSub,
  };
};

const mapDispatchToProps = {
  getAllCategoriesNoSubcategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
