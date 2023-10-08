const initData = {
  categories: [],
  categories_noSub: [],
  category: null,
  isCreated: false,
  loading: false,
  msgError: null,
  message_delete: {},
};

export default function category(state = initData, action) {
  switch (action.type) {
    case "ACTION_CREATE_CATEGORY":
      return {
        ...state,
        isCreated: true,
        category: action.data,
      };
    case "ERROR_CREATE_CATEGORY":
      return {
        ...state,
        isCreated: false,
        category: null,
        msgError: action.msg,
      };
    case "ACTION_ALL_CATEGORIES":
      return {
        ...state,
        categories: action.data,
      };
    case "ERROR_ALL_CATEGORIES":
      return {
        ...state,
        categories: [],
        msgError: action.msg,
      };
    case "ACTION_ALL_CATEGORIES_NO_SUB":
      return {
        ...state,
        categories_noSub: action.data,
      };
    case "ERROR_ALL_CATEGORIES_NO_SUB":
      return {
        ...state,
        categories_noSub: [],
        msgError: action.msg,
      };
    case "ACTION_GET_CATEGORY":
      return {
        ...state,
        category: action.data,
      };
    case "ERROR_GET_CATEGORY":
      return {
        ...state,
        category: null,
        msgError: action.msg,
      };
      case "ACTION_DELETE_CATAGORIES":
      return {
        ...state,
        message_delete: action.data,
      };
    default:
      return {
        ...state,
        isCreated: false,
        msgError: null,
      };
  }
}
