import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { BsStarFill } from "react-icons/bs";
import "./ratingdetail.css";

const RatingDetails = ({ star, quantity, totalrating }) => {
  const now = Math.ceil((quantity / totalrating) * 100);
  return (
    <div className="w-100 rating__details-wraper d-flex justify-content-center align-items-center">
      <span>{star}</span>
      <span>
        <BsStarFill color="#ea9d02" size={"14px"} />
      </span>
      <ProgressBar className="progress__bar w-80" variant="success" now={now} />
      <span>{quantity}</span>
    </div>
  );
};

export default RatingDetails;
