import API from "../config/request";
export function register(data) {
  console.log("data: ", data);
  return (dispatch) => {
    return API()
      .post(`auth/register`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_REGISTER",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({
          type: "ERROR_REGISTER",
          msg: err.data.message,
        });
      });
  };
}

export function login(data) {
  return (dispatch) => {
    return API()
      .post(`auth/login`, data)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("zyen_token", res.data.token);
        localStorage.setItem("isAdmin", res.data.isAdmin);
        localStorage.setItem("firstName", res.data.firstName);
        localStorage.setItem("tempPass", res.data.tempPass);
        localStorage.setItem("id", res.data._id);
        dispatch({
          type: "ACTION_LOGINED",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ERROR_LOGINED",
        });
      });
  };
}

export function resetPassword(email) {
  return (dispatch) => {
    return API()
      .post(`auth/reset-password`, { email })
      .then((res) => {
        dispatch({
          type: "ACTION_RESET_PASSWORD",
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_RESET_PASSWORD",
          msg: err.data,
        });
      });
  };
}

export function resetData() {
  return (dispatch) => {
    dispatch({
      type: "RESET_DATA",
    });
  };
}

export default {
  register,
  login,
  resetPassword,
  resetData,
};
