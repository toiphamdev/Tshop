import React from "react";
import { Link } from "react-router-dom";
import "./iconlink.css";

const IconLink = ({ icon, twoLink, ...props }) => {
  return (
    <>
      {twoLink ? (
        <div className="linkicon__wrapper">
          {icon ? icon : null}
          <span className="linkicon__title">{props?.children}</span>
        </div>
      ) : (
        <div className="linkicon__wrapper">
          {icon ? icon : null}
          <span className="linkicon__title">{props?.children}</span>
        </div>
      )}
    </>
  );
};

export default IconLink;
