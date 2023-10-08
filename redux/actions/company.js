import API from "../config/request";

export const searchCompaniesStoreDatabase = (name) => {
  return (dispatch) => {
    return API()
      .get(`companies/search?name=${name}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_COMPANIES_STORE_DATABASE",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_GET_COMPANIES_STORE_DATABASE",
          msg: err.response,
        });
      });
  };
};

export const getAllCompanies = () => {
  return (dispatch) => {
    return API()
      .get("companies")
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_COMPANIES",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_ALL_COMPANIES",
          msg: err.response,
        });
      });
  };
};
export const deleteCompany = (id) => {
  return API()
    .delete(`companies/delete/${id}`)
    .then((res) => {
      dispatch({
        type: "ACTION_DELETE_COMPANY",
        data: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export default {
  searchCompaniesStoreDatabase,
  getAllCompanies,
};
