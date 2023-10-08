import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArticleEditor from "../../ArticleEditor/ArticleEditor";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const TenderDetails = (props) => {
  const [editor, seteditor] = useState("");
  const onChangeEditor = (value) => {
    seteditor(value);
  };
  return (
    <div className="tender-information">
      <h3>Tender Details</h3>
      <hr />
      <div className="form-add-listing">
        <div className="">
          <TextField
            required
            label="Title"
            variant="outlined"
            style={{ width: "100%", margin: "0 !important", textAlign: "left" }}
            className="form-text-input"
            name="tenderTitle"
            id="tenderTitle"
            value={props.allValues.tenderTitle}
            onChange={props.updateValues}
          />
        </div>

        <div style={{ margin: "20px 0px 20px 0px" }}>
          <TextField
            required
            className="form-text-input"
            style={{ width: "100%" }}
            label="Tender Number"
            variant="outlined"
            name="tenderValue"
            id="tenderValue"
            type="text"
            value={props.allValues.tenderValue}
            onChange={props.updateValues}
          />
        </div>

        <div>
          {/* <TextField
            id="outlined-multiline-static"
            label="Tender Details"
            required
            multiline
            rows={6}
            variant="outlined"
            name="tenderDetails"
            id="tenderDetails"
            value={props.allValues.tenderDetails}
            onChange={props.updateValues}
          /> */}
          <ArticleEditor
            onChangeEditor={props.valueChangeEditor}
            editorHtml={editor}
          />
        </div>

        <div
          className="panel-card"
          style={{
            margin: "20px 0px 20px 0px",
            backgroundColor: "#f2f2f2",
            border: "1px solid #d8d8d8",
          }}
        >
          <p style={{ margin: "0px 0px 5px 0px" }}>Documents</p>
          <TextField
            required
            className="form-text-input"
            style={{ width: "100%", backgroundColor: "white" }}
            label="Paste Document URL"
            variant="outlined"
            name="documentsURL"
            id="documentsURL"
            value={props.allValues.documentsURL}
            onChange={props.updateValues}
          />
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;
