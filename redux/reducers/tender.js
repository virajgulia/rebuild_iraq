const initData = {
  totalTenders: 0,
  isCreated: false,
  tenders: [],
  tender: null,
  msgError: null,
  redirect: false,
  isEditNews: false,
  path: null,
  isDeleted: false,
  requestChangePlan: false,
  planName: null,
  isLogined: null,
};

export default function tender(state = initData, action) {
  switch (action.type) {
    case "RESET_TENDER_STATE":
      return {
        ...state,
        tender: null,
        isCreated: false,
        msgError: null,
        isDeleted: false,
        planName: null,
        requestChangePlan: false,
      };
    case "ACTION_CREATE_TENDER":
      return {
        ...state,
        isCreated: true,
        tender: action.data,
      };
    case "ACTION_TOTAL_TENDERS":
      return {
        ...state,
        totalTenders: action.data,
      };
    case "ERROR_CREATE_TENDER":
      return {
        ...state,
        isCreated: false,
        tender: null,
        msgError: action.msg,
      };
    case "ACTION_GET_ALL_TENDERS":
      return {
        ...state,
        tenders: action.data,
      };
    case "ERROR_GET_ALL_TENDERS":
      return {
        ...state,
        tenders: [],
        msgError: action.msg,
      };
    case "ACTION_GET_DETAIL_TENDER":
      if (action.data.requestChangePlan) {
        console.log(action.data)
        return {
          ...state,
          // redirect: action.data.redirect,
          // path: action.data.path,
          planName: action.data.planName,
          requestChangePlan: action.data.requestChangePlan,
          isLogined: action.data.isLogined,
          tender: action.data.tender,
        };
      } else {
        return {
          ...state,
          tender: action.data,
        };
      }
    case "ERROR_GET_DETAIL_TENDER":
      return {
        ...state,
        msgError: action.msg,
      };
    case "ACTION_DELETE_TENDER":
      return {
        ...state,
        isDeleted: true,
      };
    case "ERROR_DELETE_TENDER":
      return {
        ...state,
        isDeleted: false,
        msgError: action.msg,
      };
    case "ACTION_GET_SINGLE_TENDERS":
      return {
        ...state,
        tenders: action.data,
      };
      case "ACTION_EDIT_TENDERS":
      return {
        ...state,
        isEditNews: true,
      };
    default:
      return {
        ...state,
      };
  }
}
