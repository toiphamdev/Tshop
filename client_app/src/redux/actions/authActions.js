import { loginService } from "../../services/authService";
import { authConstants } from "../constants";

export const login = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await loginService(data);
      if (res && res.status === 200) {
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
