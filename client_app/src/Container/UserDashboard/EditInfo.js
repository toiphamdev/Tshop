import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalConvert from "../../components/ModalConvert/ModalConvert";
import {
  getUserInfoSevice,
  updatePasswordService,
  updateUserService,
} from "../../services/authService";

const EditInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [getInfoFlag, setGetInfoFlag] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [confirmErr, setConfirmErr] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  useEffect(() => {
    const getUserById = async () => {
      const res = await getUserInfoSevice(user._id);
      if (res && res.status === 200) {
        const data = res.data.getaUser;
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setEmail(data.email);
      }
    };
    getUserById();
  }, [getInfoFlag]);
  const handleChangePassword = async () => {
    if (password.length < 6) {
      setPassErr(true);
    } else {
      if (password !== confirmPassword) {
        setConfirmErr(true);
      } else {
        const res = await updatePasswordService(password);
        if (res && res.status === 200) {
          setShowModal(false);
        }
      }
    }
  };
  const handleUpdateUser = async () => {
    if (lastname && firstname && email) {
      const res = await updateUserService({ lastname, firstname, email });
      if (res && res.status === 200) {
        setGetInfoFlag(!getInfoFlag);
      }
    }
  };

  return (
    <div>
      <h3>Chỉnh sửa thông tin</h3>
      <div className="block__wrapper p-5">
        <div className="user__info py-3 d-flex">
          <label>Họ và chữ đệm</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            value={firstname}
          />
        </div>
        <div className="user__info d-flex py-3">
          <label>Tên</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            value={lastname}
          />
        </div>
        <div className="user__info py-3">
          <label>Số điện thoại</label>
          <span>{user.mobile}</span>
        </div>
        <div className="user__info d-flex py-3">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            value={email}
          />
        </div>
        <div className="edit__option d-flex justify-content-between">
          <button onClick={handleUpdateUser} className="btn__primary">
            Lưu thay đổi
          </button>
          <button onClick={() => setShowModal(true)} className="btn__secondary">
            Đổi mật khẩu
          </button>
        </div>
      </div>
      <ModalConvert
        onHide={() => setShowModal(false)}
        title={"Khởi tạo mật khẩu"}
        size={"md"}
        show={showModal}
      >
        <div className="px-5">
          <div className="pb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="form-control"
            />
            {passErr && (
              <span className="text-danger ps-3">
                Mật khẩu mới phải có ít nhất 6 kí tự
              </span>
            )}
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassWord(e.target.value)}
              placeholder="Xác nhận lại mật khẩu"
              className="form-control"
            />
            {confirmErr && (
              <span className="text-danger ps-3">
                Xác nhận mật khẩu không đúng
              </span>
            )}
          </div>
          <div className="text-center pt-3">
            <button
              onClick={() => handleChangePassword()}
              className="btn btn-danger"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </ModalConvert>
    </div>
  );
};

export default EditInfo;
