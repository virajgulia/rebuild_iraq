const initData = {
  Usercategory:null,
  users: [],
  profile: null,
  customer: null,
  isUpdated: false,
  msgError: null,
  isUpdatedPassword: false,
};

export default function user(state = initData, action) {
  switch (action.type) {
    case "ACTION_ALL_USERS":
      return {
        ...state,
        users: action.data,
      };
    case "ACTION_CREATE_CUSTOMER":
      return {
        ...state,
        customer: action.data,
      };
    case "ERROR_CREATE_CUSTOMER":
      return {
        ...state,
        customer: null,
        msgError: action.msg,
      };
    case "ACTION_PROFILE":
      return {
        ...state,
        profile: action.data,
        isUpdated: false,
        isUpdatedPassword: false,
      };
      case "ACTION_USER_CATEGORY":
      return {
        ...state,
        Usercategory: action.data,
      };
    case "ERROR_PROFILE":
      return {
        ...state,
        profile: null,
        msgError: action.msg,
      };
    case "ACTION_UPDATE_PROFILE":
      return {
        ...state,
        profile: action.data,
        isUpdated: true,
        isUpdatedPassword: false,
      };
    case "ERROR_UPDATE_PROFILE":
      return {
        ...state,
        profile: null,
        isUpdated: false,
        msgError: action.msg,
      };
    case "ACTION_UPDATE_PASSWORD":
      return {
        ...state,
        isUpdatedPassword: true,
      };
    case "ERROR_UPDATE_PASSWORD":
      return {
        ...state,
        isUpdatedPassword: false,
        msgError: action.msg,
      };
    default:
      return {
        ...state,
        isUpdatedPassword: false,
        msgError: null,
        isUpdated: false,
      };
  }
}
