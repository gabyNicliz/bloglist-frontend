const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      if (state !== null) {
        clearTimeout(state.displayTime);
      }
      return action.data;
    case 'RESET':
      return null;
    default:
      return state;
  }
};

export const showMessage = (message, displayTime) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        displayTime: setTimeout(() => {
          dispatch({
            type: 'RESET'
          });
        }, displayTime * 1000),
      },
    });
  };
};

export default notificationReducer;