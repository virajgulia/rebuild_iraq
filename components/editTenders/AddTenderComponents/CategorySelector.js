import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { getAllCategories } from "../../../redux/actions/category";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { Typography } from "@material-ui/core";

const CategorySelector = (props) => {
  const [treeCategories, setTreeCategories] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    props.getAllCategories();
  }, []);

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

  const handleSelected = (checked) => {
    setChecked(checked);
    props.updateValues(checked);
  };

  return (
    <div className="spv-information">
      <h3 style={{ textAlign: "center" }}>Select At Least One Category</h3>
      <hr></hr>
      <Typography variant="h3"></Typography>

      <div className="grid-view">
        <div className="column" style={{ width: "100%" }}>
          <div
            className="panel-card"
            style={{ backgroundColor: "#f2f2f2", border: "1px solid #d8d8d8" }}
          >
            {nodes.length > 0 && (
              <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => handleSelected(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
                showNodeTitle={true}
                nameAsArray={true}
                icons={{
                  check: <span className="rct-icon rct-icon-check" />,
                  uncheck: <span className="rct-icon rct-icon-uncheck" />,
                  halfCheck: <span className="rct-icon rct-icon-half-check" />,
                  expandClose: (
                    <span className="rct-icon rct-icon-expand-close" />
                  ),
                  expandOpen: (
                    <span className="rct-icon rct-icon-expand-open" />
                  ),
                  expandAll: <span className="rct-icon rct-icon-expand-all" />,
                  collapseAll: (
                    <span className="rct-icon rct-icon-collapse-all" />
                  ),
                  parentClose: null,
                  parentOpen: null,
                  leaf: null,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    categories: store.category.categories,
  };
};

const mapDispatchToProps = {
  getAllCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);
