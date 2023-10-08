const initData = {
  isEditProject: false,
};

export default function project(state = initData, action) {
  switch (action.type) {
    case "ACTION_EDIT_PROJECT":
      return {
        ...state,
        isEditProject: true,
      };
    default:
      return {
        ...state,
        isEditProject: false,
      };
  }
}
