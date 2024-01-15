const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE-STATE':
      return {
        ...state,
        ...action.value,
      };
    case 'ENABLE-WORLDLINE':
      return {
        ...state,
        enabled: {
          value: action.value,
        },
      };
    case 'ONSITE-MODE':
      return {
        ...state,
        onSiteMode: {
          ...action.value,
        },
      };
    case 'REDIRECT-MODE-A':
      return {
        ...state,
        redirectModeA: {
          ...action.value,
        },
      };
    case 'REDIRECT-MODE-B':
      return {
        ...state,
        redirectModeB: {
          ...action.value,
        },
      };
    case 'GENERAL-SETTINGS':
      return {
        ...action.value,
      };
    default:
      return state;
  }
};

export default reducer;
