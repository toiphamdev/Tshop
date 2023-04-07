import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./progress.css";

const ProgressBarConvert = ({ status }) => {
  const enumValues = [
    "Not Processed",
    "Cash on Delivery",
    "Processing",
    "Dispatched",
    "Delivered",
  ];
  const progress = Math.floor(
    (enumValues.indexOf(status) / (enumValues.length - 1)) * 100
  );

  return (
    <div className="w-100">
      <ProgressBar
        style={{ height: "8px" }}
        variant="success"
        animated
        now={progress}
      />
      <div className="d-flex justify-content-between mt-2">
        {enumValues.map((value, index) => (
          <div key={index}>
            <span
              className={`progress__label ${
                status === value ? "text-primary" : "text-muted"
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBarConvert;
