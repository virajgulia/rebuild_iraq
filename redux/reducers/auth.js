const initData = {
  isLoggedin: false,
  isRegister: false,
  isResetPassword: false,
  user: null,
  msgErr: null,
};

export default function auth(state = initData, action) {
  switch (action.type) {
    case "RESET_DATA":
      return {
        ...state,
        isLoggedin: false,
        isRegister: false,
        isResetPassword: false,
        user: null,
        msgErr: null,
      };
    case "ACTION_REGISTER":
      return {
        ...state,
        isRegister: true,
        isResetPassword: false,
      };
    case "ERROR_REGISTER":
      return {
        ...state,
        isRegister: false,
        msgErr: action.msg,
      };
    case "ACTION_LOGINED":
      return {
        ...state,
        isLoggedin: true,
        isResetPassword: false,
      };
    case "ERROR_LOGINED":
      return {
        ...state,
        isLoggedin: false,
      };
    case "ACTION_RESET_PASSWORD":
      return {
        ...state,
        isResetPassword: true,
        msgErr: null,
      };
    case "ERROR_RESET_PASSWORD":
      return {
        ...state,
        isResetPassword: false,
        msgErr: action.msg,
      };
    default:
      return {
        ...state,
        isLoggedin: false,
        isRegister: false,
        isResetPassword: false,
      };
  }
}
