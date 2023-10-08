const initData = {
  companiesStoreDatabase: [],
  companies: [],
  company: null,
  msgError: null,
};

export default function company(state = initData, action) {
  switch (action.type) {
    case "ACTION_GET_COMPANIES_STORE_DATABASE":
      return {
        ...state,
        companiesStoreDatabase: action.data,
      };
    case "ERROR_GET_COMPANIES_STORE_DATABASE":
      return {
        ...state,
        companiesStoreDatabase: [],
        msgError: action.msg,
      };
    case "ACTION_ALL_COMPANIES":
      return {
        ...state,
        companies: action.data,
      };
    case "ERROR_ALL_COMPANIES":
      return {
        ...state,
        companies: [],
        msgError: action.msg,
      };
      case "ACTION_DELETE_COMPANY":
      return {
        ...state,
        message_delete: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
