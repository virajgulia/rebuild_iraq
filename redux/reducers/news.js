const initData = {
  totalNews: 0,
  isAddNews: false,
  isEditNews: false,
  msgErr: null,
  news: [],
  newsDetail: {},
  newDetailSlug: {},
  message_delete: {},
};

export default function news(state = initData, action) {
  switch (action.type) {
    case "ACTION_ADD_NEWS":
      return {
        ...state,
        isAddNews: true,
      };
    case "ERROR_ADD_NEWS":
      return {
        ...state,
        isAddNews: false,
        msgErr: action.msg,
      };
    case "ACTION_EDIT_NEWS":
      return {
        ...state,
        isEditNews: true,
      };
    case "ACTION_ALL_NEWS":
      return {
        ...state,
        news: action.data,
      };
    case "ACTION_TOTAL_NEWS":
      return {
        ...state,
        totalNews: action.data,
      };
    case "ACTION_GET_NEWS":
      return {
        ...state,
        newsDetail: action.data,
      };
    case "ACTION_GET_NEWS_SLUG":
      return {
        ...state,
        newDetailSlug: action.data,
      };
    case "ACTION_DELETE_NEWS":
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
