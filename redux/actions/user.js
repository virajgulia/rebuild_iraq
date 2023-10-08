import API from "../config/request";

export function getAllUsers() {
  return (dispatch) => {
    return API()
      .get(`user/all`)
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_USERS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createCustomerStripe(data) {
  return (dispatch) => {
    return API()
      .post(`customers/add`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_CREATE_CUSTOMER",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_CREATE_CUSTOMER",
          msg: err.response,
        });
      });
  };
}

export function getProfile() {
  return (dispatch) => {
    return API()
      .get("user/profile")
      .then((res) => {
        console.log('ddddddd', res.data)
        dispatch({
          type: "ACTION_PROFILE",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_PROFILE",
          msg: err.response,
        });
      });
  };
}
export function getUserCategory() {
  return (dispatch) => {
    return API()
      .get("user/profile/category")
      .then((res) => {
        console.log('ddddddd', res.data)
        dispatch({
          type: "ACTION_USER_CATEGORY",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_PROFILE",
          msg: err.response,
        });
      });
  };
}

export function updateProfile(data) {
  console.log("object:::::>", data)
  return (dispatch) => {
    return API()
      .put("user/profile", data)
      .then((res) => {
        dispatch({
          type: "ACTION_UPDATE_PROFILE",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_UPDATE_PROFILE",
          msg: err.response,
        });
      });
  };
}

export function updatePassword(data) {
  return (dispatch) => {
    return API()
      .put("user/password", data)
      .then((res) => {
        dispatch({
          type: "ACTION_UPDATE_PASSWORD",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_UPDATE_PASSWORD",
          msg: err,
        });
      });
  };
}
export function changePassword(data) {
  console.log('this is email changepassword',data);
  return (dispatch) => {
    console.log('Dispatch');
    return API()
      .post("auth/update-password", data)
      .then((res) => {
        console.log("-----")
        dispatch({
          type: "ACTION_UPDATE_PASSWORD",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_UPDATE_PASSWORD",
          msg: err,
        });
      });
  };
}

export default {
  getAllUsers,
  createCustomerStripe,
  getProfile,
  updateProfile,
  updatePassword,
  changePassword,
};
