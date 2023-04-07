import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPasswordService } from "../../services/authService";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const handleResetPassword = async () => {
    const res = await resetPasswordService(token, password);
    console.log(res);
  };
  return (
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
                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Nhập mật khẩu
                        </label>
                        <input
                          type="password"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Xác nhận mật khẩu
                        </label>
                        <input
                          type="password"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Xác nhận mật khẩu"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPassword !== password && (
                          <p className="text-danger">
                            Xác nhận mật khẩu không chính xác
                          </p>
                        )}
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-block fa-lg gradient-custom-2 mb-3"
                          type="button"
                          onClick={handleResetPassword}
                        >
                          Cài lại mật khẩu
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2 hide__mobile">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
