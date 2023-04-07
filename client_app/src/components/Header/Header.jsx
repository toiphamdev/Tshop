import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillHeartFill, BsSearch } from "react-icons/bs";
import { FaBalanceScaleRight, FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProdCategory } from "../../redux/actions";
import { createListCategory } from "../../utils";
import IconLink from "../IconLink/IconLink";
import SubNav from "../SubNav/SubNav";
import "./header.css";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const app = useSelector((state) => state.app);
  const [prodCatArr, setProdCatArr] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProdCategory());
  }, []);
  useEffect(() => {
    setProdCatArr(createListCategory(app.prodCategories));
  }, [app.prodCategories]);
  const renderCategories = (categories) => {
    return (
      categories.length > 0 &&
      categories.map((category) => {
        return (
          <li className="px-2" key={category._id || category.title}>
            {category.parentId && category.parentSlug ? (
              <Link to={`/${category.parentSlug}/${category.slug}`}>
                {category.title}
              </Link>
            ) : (
              <Link to={`/${category.slug}`}>{category.title}</Link>
            )}
            {category.children && category.children.length > 0 ? (
              <ul>{renderCategories(category.children)}</ul>
            ) : null}
          </li>
        );
      })
    );
  };
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
                <div
                  className="pc_item d-flex align-items-center"
                  href="#action1"
                >
                  {!auth.authenticate ? (
                    <IconLink twoLink={true} icon={<FaUser size={"28px"} />}>
                      <Link className="link" to="/login">
                        Đăng nhập
                      </Link>{" "}
                      <br />
                      <Link className="link" to="/register">
                        Đăng kí
                      </Link>
                    </IconLink>
                  ) : (
                    <IconLink twoLink={true} icon={<FaUser size={"28px"} />}>
                      <Link
                        className="link"
                        to="/login"
                      >{`${auth.user.firstname} ${auth.user.lastname}`}</Link>{" "}
                      <br />
                      <Link className="link" to="/user">
                        Tài khoản của tôi
                      </Link>
                    </IconLink>
                  )}
                </div>
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
                ></NavDropdown>
              </Nav>
              {/* mobile items */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <SubNav>
        <NavDropdown title="Danh mục sản phẩm">
          {renderCategories(prodCatArr)}
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
