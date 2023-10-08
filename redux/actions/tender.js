import API from "../config/request";

export const createTender = (data) => {
  return (dispatch) => {
    return API()
      .post("tenders/add", data)
      .then((res) => {
        dispatch({
          type: "ACTION_CREATE_TENDER",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_CREATE_TENDER",
          msg: err.response,
        });
      });
  }; 
};

export const getAllTender = (searchText,page) => {
  return (dispatch) => {
    return API()
      .get("tenders?search=" + searchText+"&pageIndex=" + page )
      .then((res) => {
        dispatch({
          type: "ACTION_GET_ALL_TENDERS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_GET_ALL_TENDERS",
          msg: err.response,
        });
      });
  };
};

export function getTotalTender() {
  return (dispatch) => {
    return API()
      .get(`tenders/total/allTenders`)
      .then((res) => {
         console.log('data', res.data)
        dispatch({
          type: "ACTION_TOTAL_TENDERS",
          data: res.data.tendersCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const getDetailTender = (id) => {
  return (dispatch) => {
    return API()
      .get(`tenders/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_DETAIL_TENDER",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_GET_DETAIL_TENDER",
          msg: err.response,
        });
      });
  };
};

export const deleteTender = (id, data) => {
  return (dispatch) => {
    return API()
      .delete(`tenders/${id}`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_DELETE_TENDER",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_DELETE_TENDER",
          msg: err.response,
        });
      });
  };
};

export const resetTender = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_TENDER_STATE",
    });
  };
};
export const getTernderById = (id) => {
  return (dispatch) => {
    return API()
      .get(`tenders/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_SINGLE_TENDERS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_CREATE_TENDER",
          msg: err.response,
        });
      });
  };
};
export function updateTender(id, data) {

    return API()
      .put(`tenders/updateTender/${id}`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_EDIT_Tender",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
}

export default {
  createTender,
  getAllTender,
  resetTender,
  getDetailTender,
  deleteTender,
  getTernderById,
  getTotalTender
};
