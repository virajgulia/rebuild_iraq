const initData = {
  isAddListing: false,
  listing: null,
  msgErr: null,
  listings: [],
  listingDetail: {},
  isExist: false,
  message_delete: {}
};

export default function listing(state = initData, action) {
  switch (action.type) {
    case "ACTION_ADD_LISTING":
      return {
        ...state,
        isAddListing: true,
        listing: action.data,
      };
    case "ERROR_ADD_LISTING":
      return {
        ...state,
        isAddListing: false,
        msgErr: action.msg,
      };
    case "ACTION_ALL_LISTINGS":
      return {
        ...state,
        listings: action.data,
      };
    case "ACTION_GET_LISTING":
      return {
        ...state,
        listingDetail: action.data,
      };
    case "ACTION_CHECK_EXIST_ID":
      return {
        ...state,
        isExist: action.data,
      };
    case "ACTION_DELETE_SPV":
      return {
        ...state,
        message_delete: action.data,
      };
    default:
      return {
        ...state,
        isAddListing: false,
      };
  }
}
