import API from "../config/request";

export const createCategory = (data) => {
  return (dispatch) => {
    return API()
      .post("categories/add", data)
      .then((res) => {
        dispatch({
          type: "ACTION_CREATE_CATEGORY",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_CREATE_CATEGORY",
          msg: err.response,
        });
      });
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    return API()
      .get("categories")
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_CATEGORIES",
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ALL_CATEGORIES",
          msg: err.response,
        });
      });
  };
};

export const getAllCategoriesNoSubcategory = () => {
  return (dispatch) => {
    return API()
      .get("categories/no-sub")
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_CATEGORIES_NO_SUB",
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ALL_CATEGORIES_NO_SUB",
          msg: err.response,
        });
      });
  };
};

export const getCategoryById = (id) => {
  return (dispatch) => {
    return API()
      .get(`categories/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_CATEGORY",
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_GET_CATEGORY",
          msg: err.response,
        });
      });
  };
};

export const deleteCategory = (id) => {
    return API()
      .delete(`categories/delete/${id}`)
      .then((res) => {
        dispatch({
          type: "ACTION_DELETE_CATAGORIES",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
}
export default {
  createCategory,
  getAllCategories,
  getAllCategoriesNoSubcategory,
  getCategoryById,
  deleteCategory
};
