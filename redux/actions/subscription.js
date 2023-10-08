import API from "../config/request";

export const subscriptionPlan = (data) => {
  return (dispatch) => {
    return API()
      .post("subscriptions/create", data)
      .then((res) => {
        dispatch({
          type: "ACTION_CREATE_SUBSCRIPTION",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_CREATE_SUBSCRIPTION",
          msg: err.response,
        });
      });
  };
};

export default {
  subscriptionPlan,
};
