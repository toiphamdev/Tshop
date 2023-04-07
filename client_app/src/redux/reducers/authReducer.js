import { authConstants } from "../constants";

const initState = {
  authenticating: false,
  user: {},
  token: "",
  authenticate: false,
  error: "",
};

const authReducer = (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      let stateCoppy = {
        ...state,
        authenticating: true,
      };
      return stateCoppy;
    }
    case authConstants.LOGIN_SUCCESS: {
      const { firstname, lastname, mobile, token, _id } = action.payload;
      let stateCoppy = {
        ...state,
        authenticating: false,
        authenticate: true,
        user: { firstname, lastname, mobile, _id },
        token: token,
      };
      return stateCoppy;
    }
    case authConstants.LOGIN_FAILURE: {
      const { errMessage } = action.payload;
      let stateCoppy = {
        ...state,
        authenticating: false,
        error: errMessage,
      };
      return stateCoppy;
    }
    case authConstants.REFRESH_TOKEN_REQUEST: {
      let stateCoppy = {
        ...state,
        authenticating: true,
      };
      return stateCoppy;
    }
    case authConstants.REFRESH_TOKEN_SUCCESS: {
      const { accessToken } = action.payload;
      let stateCoppy = {
        ...state,
        authenticating: false,
        token: accessToken,
      };
      return stateCoppy;
    }
    case authConstants.REFRESH_TOKEN_FAILURE: {
      const { errMessage } = action.payload;
      let stateCoppy = {
        ...state,
        authenticating: false,
        error: errMessage,
      };
      return stateCoppy;
    }
    case authConstants.LOGOUT_SUCCESS: {
      localStorage.clear();
      let stateCoppy = {
        ...state,
        authenticate: false,
        user: {},
      };
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default authReducer;
