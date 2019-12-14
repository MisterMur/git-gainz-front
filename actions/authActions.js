import {API_URL} from '../constants/types.js'
import {EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER} from '../constants/authTypes.js'


export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({
      type: LOAD_SPINNER
    });
    // debugger
    fetch(API_URL+'/login', {
        method: 'POST',
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          }
        })
      }).then((response) => {
        console.log(response);
        if (response.status === 401) {
          console.log('AUTHENTICATION server 401 ERROR!!');
          dispatch({
            type: LOGIN_FAILED
          });
        }
        if (response.status === 500) {
          console.log('unkown server 500 ERROR!!');
          dispatch({
            type: LOGIN_FAILED
          });
        }
        else {
          console.log('SUCCESS!!');
          response.json().then(data => {
            console.log(data);
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: data
            });
          });
        }
      });
  };
};
