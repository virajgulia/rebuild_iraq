import API from "../config/request";

export function deleteAsset(id) {
  return (dispatch) => {
    return API()
      .delete(`asset/delete/${id}`)
      .then((res) => {
        dispatch({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export default {
  deleteAsset,
};
