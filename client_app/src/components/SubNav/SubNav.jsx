import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./subnav.css";

const SubNav = ({ children, ...props }) => {
  return (
    <div className="subnav__wrapper">
      <Navbar>
        <Container fluid>{children}</Container>
      </Navbar>
    </div>
  );
};

export default SubNav;
