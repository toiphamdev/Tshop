import { provinceInstance } from "../helpers/axios";

export const getAllProvinceService = async () => {
  try {
    const res = await provinceInstance.get("/p");
    return res;
  } catch (error) {
    // error.response;
  }
};
export const getDistricsByProvince = async (code) => {
  try {
    const res = await provinceInstance.get(`/p/${code}?depth=2`);
    return res;
  } catch (error) {
    // error.response;
  }
};
export const getWardsByDistric = async (code) => {
  try {
    const res = await provinceInstance.get(`/d/${code}?depth=2`);
    return res;
  } catch (error) {
    // error.response;
  }
};
