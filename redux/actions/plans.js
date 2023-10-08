import API from "../config/request";

export const getAllPlans = () => {
  return (dispatch) => {
    return API()
      .get("plans")
      .then((res) => {
        dispatch({
          type: "ACTION_GET_ALL_PLANS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_GET_ALL_PLANS",
          msg: err.response,
        });
      });
  };
};

export default {
  getAllPlans
}