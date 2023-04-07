import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalConvert from "../../components/ModalConvert/ModalConvert";
import {
  getUserInfoSevice,
  updateAddressService,
} from "../../services/authService";
import Select from "react-select";
import {
  getAllProvinceService,
  getDistricsByProvince,
  getWardsByDistric,
} from "../../services/addressService";

const UserAddress = () => {
  const user = useSelector((state) => state.auth.user);
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addFlag, setAddFlag] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [provinceArr, setProvinceArr] = useState([]);
  const [districtArr, setDistricArr] = useState([]);
  const [wardArr, setWardArr] = useState([]);
  const [selectedPro, setSelectedPro] = useState(null);
  const [selectedDist, setSelectedDist] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoSevice(user._id);
      if (res && res.status === 200) {
        setAddress(res.data.getaUser.address ? res.data.getaUser.address : "");
      }
    };
    getUserInfo();
  }, [addFlag]);
  useEffect(() => {
    const getAllProvince = async () => {
      const res = await getAllProvinceService();
      if (res && res.status === 200) {
        setProvinceArr(builtDataSelect(res.data));
        setDistricArr([]);
        setWardArr([]);
      }
    };
    getAllProvince();
  }, []);
  useEffect(() => {
    const getAllDistrics = async () => {
      const res = await getDistricsByProvince(selectedPro.value);
      if (res && res.status === 200) {
        setDistricArr(builtDataSelect(res.data.districts));
        setWardArr([]);
      }
    };
    if (selectedPro) {
      getAllDistrics();
    }
  }, [selectedPro]);
  useEffect(() => {
    const getAllWard = async () => {
      const res = await getWardsByDistric(selectedDist.value);
      if (res && res.status === 200) {
        setWardArr(builtDataSelect(res.data.wards));
      }
    };
    if (selectedDist) {
      getAllWard();
    }
  }, [selectedDist]);
  const builtDataSelect = (arr) => {
    return arr.map((item) => {
      return {
        label: item.name,
        value: item.code,
      };
    });
  };
  const handleSaveAddress = async () => {
    if (selectedDist && selectedPro && selectedWard && address) {
      const string =
        selectedPro.label +
        ", " +
        selectedDist.label +
        ", " +
        selectedWard.label +
        ", " +
        addressDetail;
      const res = await updateAddressService(string);
      if (res && res.status === 200) {
        setAddModal(false);
        setAddFlag(!addFlag);
      }
    }
  };
  return (
    <div className="block__wrapper text-center">
      <div className="p-3 d-flex justify-content-center">
        <span>{address ? address : "Bạn chưa cập nhật địa chỉ..."}</span>
      </div>
      <button onClick={() => setAddModal(true)} className="btn__secondary ms-3">
        Cập nhật
      </button>
      <ModalConvert
        title={"Cập nhật địa chỉ"}
        show={addModal}
        onHide={() => setAddModal(false)}
        size="md"
      >
        <div className="d-flex flex-wrap justify-content-between">
          <Select
            className="m-3"
            placeholder="Chọn Tỉnh/Thành"
            value={selectedPro}
            onChange={(option) => setSelectedPro(option)}
            options={provinceArr}
          />
          <Select
            className="m-3"
            placeholder="Chọn Quận/Huyện"
            value={selectedDist}
            onChange={(option) => setSelectedDist(option)}
            options={districtArr}
          />
          <Select
            className="m-3"
            placeholder="Chọn Xã/Phường"
            value={selectedWard}
            onChange={(option) => setSelectedWard(option)}
            options={wardArr}
          />
          <input
            placeholder="Nhập địa chỉ số nhà,..."
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="form-control m-3"
          />
          <button
            onClick={() => handleSaveAddress()}
            className="btn__secondary ms-3"
          >
            Lưu thay đổi
          </button>
        </div>
      </ModalConvert>
    </div>
  );
};

export default UserAddress;
