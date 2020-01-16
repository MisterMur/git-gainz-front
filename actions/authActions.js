import {API_URL} from '../constants/types.js'
import UserAdapter from '../adapters/userAdapter'
import {FETCH_CURRENTUSER_SUCCESS,FETCH_CURRENTUSER_FAILURE,MAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER,LOGOUT} from '../constants/authTypes.js'
import {Alert} from 'react-native'
import {FETCH_SCHEDULES_SUCCESS} from '../constants/types.js'
import {  navigate, NavigationActions, navigation } from 'react-navigation';

import {AsyncStorage} from 'react-native'
export const emailChanged = (email) => {
  return {
    type: EMAIL_CHANGED,
    payload: email
  };
};

// export const getCurrentUser = (userTok)=>{
//
// }

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

export const fetchCurrentUserSuccess=(user)=>{
  return {
    type:LOGIN_USER_SUCCESS,
    payload:user
  }
}
export const fetchCurrentUserFailure=(error)=>({
  type:LOGIN_FAILED,
  payload:{error}
})
export function postNewUser(user){
  return dispatch =>{
    return UserAdapter.addNewUser(user)
    .then(res=>{
      console.log(res)
      // dispatch()

    })

  }
}
export function setCurrentUser(){
  return (dispatch)=>{
    return UserAdapter.fetchCurrentUser()
    .then(user=>{
      console.log('setting user',user)
      dispatch(fetchCurrentUserSuccess(user))
      return user
    })
    .catch(error=>
       dispatch(fetchCurrentUserFailure(error))
     )
  }
}

export function getUserToken(){
  return dispatch=>{
    UserAdapter.isLoggedIn()
  }
}

export function logoutCurrentUser() {
  return dispatch=>{
    AsyncStorage.clear()

    dispatch({type:LOGOUT})
  }

}
