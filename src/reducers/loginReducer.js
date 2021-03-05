import loginService from '../services/login';
import blogService from '../services/blogs';
const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
const initialState = loggedUserJSON ? loggedUserJSON : null;

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const userLogin = (user) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(user);
    window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(loggedUser),
    );
    blogService.setToken(user.token);

    dispatch({
      type: 'USER_LOGIN',
      data: loggedUser,
    });
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({ type: 'LOGOUT' });
  };
};

export default loginReducer;