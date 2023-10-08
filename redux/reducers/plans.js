const initData = {
  plans: [],
  plan: null,
  msgError: null,
};

export default function plans(state = initData, action) {
  console.log("action",action)
  switch (action.type) {
    case "ACTION_GET_ALL_PLANS":
      return {
        ...state,
        plans: action.data,
      };
    case "ERROR_GET_ALL_PLANS":
      return {
        ...state,
        plans: [],
        msgError: action.msg,
      };
    default:
      return {
        ...state,
      };
  }
}
