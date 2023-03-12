import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./digitalitem.css";
const DigitalItem = (props) => {
  const { tooltip, icon, title } = props;
  return (
    <div className="digitalitem__wrapper position-relative">
      {icon && icon}
      <span className="digitalitem__title">{title}</span>
      <span className="tooltip__span">{tooltip && tooltip}</span>
    </div>
  );
};

export default DigitalItem;
