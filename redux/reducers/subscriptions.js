const initData = {
  subscription: null,
  msgError: null,
};

export default function subscriptions(state = initData, action) {
  switch (action.type) {
    case "ACTION_CREATE_SUBSCRIPTION":
      return {
        ...state,
        subscription: action.data,
      };
    case "ERROR_CREATE_SUBSCRIPTION":
      return {
        ...state,
        subscription: null,
        msgError: action.msg,
      };
    default:
      return {
        ...state,
      };
  }
}
