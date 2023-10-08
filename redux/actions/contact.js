import API from "../config/request";

export const searchContactsStoreDatabase = (name) => {
  return (dispatch) => {
    return API()
      .get(`contacts/search?name=${name}`)
      .then((res) => {
        dispatch({
          type: "ACTION_GET_CONTACTS_STORE_DATABASE",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err: ", err);
        dispatch({
          type: "ERROR_GET_CONTACTS_STORE_DATABASE",
          msg: err.response,
        });
      });
  };
};

export const getAllContacts = () => {
  return (dispatch) => {
    return API()
      .get("contacts")
      .then((res) => {
        dispatch({
          type: "ACTION_ALL_CONTACTS",
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("err; ", err);
        dispatch({
          type: "ERROR_ALL_CONTACTS",
          msg: err.response,
        });
      });
  };
};

export default {
  searchContactsStoreDatabase,
  getAllContacts,
};
