import axios from "axios";
import { loginService, resfreshTokenService } from "../../services/authService";
import { authConstants } from "../constants";

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await loginService(data);
      if (res && res.status === 200) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: { ...res.data },
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { ...res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshToken = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.REFRESH_TOKEN_REQUEST });
    try {
      const res = await resfreshTokenService();
      if (res && res.status === 200) {
        dispatch({
          type: authConstants.REFRESH_TOKEN_SUCCESS,
          payload: { ...res.data },
        });
      } else {
        dispatch({
          type: authConstants.REFRESH_TOKEN_FAILURE,
          payload: { ...res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
