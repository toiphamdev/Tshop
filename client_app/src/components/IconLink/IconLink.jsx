import React from "react";
import "./iconlink.css";

const IconLink = ({ icon, ...props }) => {
  return (
    <div className="linkicon__wrapper">
      {icon ? icon : null}
      <span className="linkicon__title">{props?.children}</span>
    </div>
  );
};

export default IconLink;
