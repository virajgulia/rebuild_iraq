import API from "../config/request";

export function addListing(data) {
  return (dispatch) => {
    return API()
      .post(`listing/add`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_ADD_LISTING",
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ADD_LISTING",
          msg: err.data.msg,
        });
      });
  };
}

export function getAllListings() {
  return (dispatch) => {
    return API()
      .get(`listing/all`)
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_LISTINGS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getListing(id) {
  return (dispatch) => {
    return API()
      .get(`listing/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_LISTING",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function checkExistId(id) {
  return (dispatch) => {
    return API()
      .get(`listing/checkSPV/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_CHECK_EXIST_ID",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteSPV(id) {
  return (dispatch) => {
    return API()
      .delete(`listing/delete/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_DELETE_SPV",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export function updateSPV(id, data) {
  return (dispatch) => {
    return API()
      .put(`listing/edit/${id}`, data)
      .then((res) => {
        dispatch({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
}

export default {
  addListing,
  getAllListings,
  getListing,
  checkExistId,
  deleteSPV,
  updateSPV,
};
