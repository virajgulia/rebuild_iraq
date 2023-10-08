const initData = {
  contactsStoreDatabase: [],
  contacts: [],
  contact: null,
  msgError: null,
};

export default function contact(state = initData, action) {
  switch (action.type) {
    case "ACTION_GET_CONTACTS_STORE_DATABASE":
      return {
        ...state,
        contactsStoreDatabase: action.data,
      };
    case "ERROR_GET_CONTACTS_STORE_DATABASE":
      return {
        ...state,
        contactsStoreDatabase: [],
        msgError: action.msg,
      };
    case "ACTION_ALL_CONTACTS":
      return {
        ...state,
        contacts: action.data,
      };
    case "ERROR_ALL_CONTACTS":
      return {
        ...state,
        msgError: action.msg,
        contacts: [],
      };
    default:
      return {
        ...state,
      };
  }
}
