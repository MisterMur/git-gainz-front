import {API_URL} from '../constants/types.js'
import UserAdapter from '../adapters/userAdapter'
import {EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER,LOGOUT} from '../constants/authTypes.js'
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
            // AsyncStorage.setItem('user_id', data.access_token)
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: data
            });
          });
        }
      });
  };
};

export function postNewUser(user){
  return dispatch =>{
    return UserAdapter.addNewUser(user)
    .then(function(){
      // dispatch()
    })

  }
}
export function setCurrentUser(email, response, nav, from) {
  return dispatch => {
    UserAdapter.getUsers()
    .then(users => {
      // console.log(users)
      let userAttempt = users.filter(user => user.email === email)
      let foundUser = userAttempt[0]
      let userId = foundUser.id
      console.log('setcurrent user found user',foundUser)
      if (response) {
        // console.log('in set current user found user:',foundUser)
        dispatch({
          type: FETCH_SCHEDULES_SUCCESS,
          payload: foundUser
        })

        dispatch({
          type: LOGIN_USER_SUCCESS ,
          payload: userId
        })
        if (from === "sign-up") {
          // console.log('navigating from sign up to scheudles: ', nav)
          nav.navigate('ScheduleList')
        } else {
          // console.log('navigating from else to scheudles ')

          nav.navigate('ScheduleList')
        }
      } else {
        Alert.alert(
        'Invalid Credentials',
        'Please verify your log in information is correct',
        [
          {
            text: 'OK',
            onPress: () => console.log('Ok Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      )
      }
    })
    .catch(function(error) {
      console.log('Set Current User There has been a problem with your fetch operation: ' + error.message);
        throw error;})
  }
}

export function logoutCurrentUser() {
  AsyncStorage.setItem('user_id', '')
  AsyncStorage.setItem('access_token','')

  return {
    type: LOGOUT
  }
}
