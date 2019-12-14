import {EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER} from '../constants/authTypes.js'
const initialState = {
  email: '',
  password: '',
  currentUser:'',
  authentication_token: '',
  errorFlag: false,
  spinner: false
};
import {AsyncStorage} from 'react-native'

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_FAILED:
      return { ...state, errorFlag: true, password: '', spinner: false };
    case LOGIN_USER_SUCCESS:
      // if (action.payload.access_token) {
      //   console.log('access token',action.payload.access_token)
      //   AsyncStorage.setItem('authentication_token', action.payload.authentication_token);
      // }
      // if (action.payload.user_id) {
      //   console.log('action payload user_id',action.payload.user_id)
      //   AsyncStorage.setItem('userId', action.payload.user_id);
      // };
      // AsyncStorage.setItem('user', action.payload);


      return { ...state, currentUser:action.payload,spinner:false };
    case LOAD_SPINNER:
      return { ...state, spinner: true };
    default:
      return state;
  }
};
