import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillHeartFill, BsSearch } from "react-icons/bs";
import { FaBalanceScaleRight, FaShoppingCart, FaUser } from "react-icons/fa";
import IconLink from "../IconLink/IconLink";
import SubNav from "../SubNav/SubNav";
import "./header.css";

const Header = () => {
  return (
    <>
      <Navbar expand="sm" className="header-wrapper">
        <Container fluid>
          <Navbar.Brand href="/">
            <h3 className="logo">Tshop</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                className="logo"
                id={`offcanvasNavbarLabel-expand-sm`}
              >
                Tshop
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ alignItems: "center" }}>
              <Form className="d-flex" style={{ maxHeight: "40px" }}>
                <Form.Control
                  type="search"
                  placeholder="Nhập sản phẩm cần tìm..."
                  className="me-2"
                  aria-label="Search"
                />
                <button className="btn__primary">
                  <BsSearch size="20px" />
                </button>
              </Form>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* pc item */}
                <Nav.Link className="pc_item" href="#action4">
                  <IconLink icon={<FaBalanceScaleRight size={"28px"} />}>
                    So sánh <br />
                    Sản phẩm
                  </IconLink>
                </Nav.Link>
                <Nav.Link className="pc_item" href="#action2">
                  <IconLink icon={<BsFillHeartFill size={"28px"} />}>
                    Danh sách <br /> yêu thích
                  </IconLink>
                </Nav.Link>
                <Nav.Link className="pc_item" href="#action1">
                  <IconLink icon={<FaUser size={"28px"} />}>
                    Đăng nhập <br />
                    Tài khoản của tôi
                  </IconLink>
                </Nav.Link>
                <Nav.Link className="pc_item" href="#action3">
                  <IconLink icon={<FaShoppingCart size={"28px"} />}>
                    <span className="header__cart-quantity">0</span> <br />
                    <span className="header__cart-price"> 200000 VND</span>
                  </IconLink>
                </Nav.Link>
                {/* tablet item */}
                <Nav.Link className="tablet__item" href="#action4">
                  So sánh
                  <br /> sản phẩm
                </Nav.Link>
                <Nav.Link className="tablet__item" href="#action2">
                  Danh sách
                  <br /> yêu thích
                </Nav.Link>
                <Nav.Link className="tablet__item" href="#action1">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link className="tablet__item" href="#action3">
                  Giỏ hàng
                </Nav.Link>
                {/* mobile item */}
                <Nav.Link className="mobile__item" href="#action4">
                  So sánh sản phẩm
                </Nav.Link>
                <Nav.Link className="mobile__item" href="#action2">
                  Danh sách yêu thích
                </Nav.Link>
                <Nav.Link className="mobile__item" href="#action1">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link className="mobile__item" href="#action3">
                  Giỏ hàng
                </Nav.Link>
                <NavDropdown
                  className="mobile__item"
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-sm`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              {/* mobile items */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <SubNav>
        <NavDropdown title="Danh mục sản phẩm">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link className="mx-3" href="/">
          Trang chủ
        </Nav.Link>
        <Nav.Link className="mx-3" href="/">
          Bài viết
        </Nav.Link>
        <Nav.Link className="mx-3" href="/">
          Liên hệ
        </Nav.Link>
      </SubNav>
    </>
  );
};

export default Header;
