import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { Typography } from "@material-ui/core";

const DueDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  let expDate = moment(startDate)
    .hour(23)
    .minute(59)
    .second(59)
    .milliseconds(0)
    .format("MM/DD/YYYY HH:mm:ss");

  useEffect(() => {
    props.updateValues(expDate);
  }, [startDate]);

  return (
    <div className="spv-information">
      <h3 style={{ textAlign: "center" }}>Tender Due Date</h3>
      <hr></hr>
      <Typography variant="h3"></Typography>

      <div className="grid-view">
        <div className="column" style={{ width: "100%" }}>
          <div
            className="panel-card"
            style={{
              backgroundColor: "#f2f2f2",
              border: "1px solid #d8d8d8",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p>Please select the tender due date</p>
            <DatePicker
              id="selectDueDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // onClick={props.updateValues}
              name="dueDate"
              // value={exp}
              // value={props.updateValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDatePicker;
