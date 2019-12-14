import {EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER} from '../constants/authTypes.js'
const initialState = {
  email: '',
  password: '',
  authentication_token: '',
  errorFlag: false,
  spinner: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_FAILED:
      return { ...state, errorFlag: true, password: '', spinner: false };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...action.payload, ...initialState };
    case LOAD_SPINNER:
      return { ...state, spinner: true };
    default:
      return state;
  }
};
