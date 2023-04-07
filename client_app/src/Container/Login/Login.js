import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import { login, refreshToken } from "../../redux/actions";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.authenticate) {
      navigate("/");
    }
  }, [auth.authenticate]);
  const handleUserLogin = () => {
    dispatch(
      login({
        email,
        password,
      })
    );
  };
  const refresh = () => {
    dispatch(refreshToken());
  };
  return (
    <>
      <ScrollToTop />
      <section
        className="d-flex align-items-center"
        style={{ backgroundColor: "#eee", minHeight: "100vh" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body px-5">
                      <div className="text-center">
                        <h3 className="logo">Tshop</h3>
                      </div>
                      <p className="text-muted">
                        Đăng nhập để bắt đầu vào trang:
                      </p>
                      {auth.error && (
                        <p className="text-danger">{auth.error}</p>
                      )}
                      <form>
                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Tài khoản
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Địa chỉ email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Mật khẩu
                          </label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Nhập mật khẩu của bạn"
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={handleUserLogin}
                          >
                            Đăng nhập
                          </button>
                          <Link
                            to="/forgot-password"
                            className="text-muted ms-3"
                            href="#!"
                          >
                            Quên mật khẩu
                          </Link>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Bạn chưa có tài khoản?</p>
                          <button
                            type="button"
                            className="btn gradient-custom-1"
                            // onClick={refresh}
                          >
                            Đăng kí
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2 hide__mobile">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
