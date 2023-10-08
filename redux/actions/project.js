import API from "../config/request";

export function deleteProject(id) {
  return (dispatch) => {
    return API()
      .delete(`project/delete/${id}`)
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

export function updateProject(data) {
  return (dispatch) => {
    return API()
      .put(`project/edit`, data)
      .then((res) => {
        dispatch({
          type: "ACTION_EDIT_PROJECT",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
}

export default {
  deleteProject,
  updateProject,
};
