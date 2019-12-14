import {API_URL} from '../constants/types.js'
import {EMAIL_CHANGED,PASSWORD_CHANGED,LOGIN_FAILED,LOGIN_USER_SUCCESS,LOAD_SPINNER} from '../constants/authTypes.js'

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
            AsyncStorage.setItem('user_id', data.access_token)
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: data
            });
          });
        }
      });
  };
};


export function setCurrentUser(email, response, nav, from) {
  return dispatch => {
    PetAdapter.getUsers()
    .then(users => {
      let userAttempt = users.filter(user => user.email === email)
      let foundUser = userAttempt[0]
      let userId = foundUser.id
      if (response) {

        dispatch({
          type: SET_USER,
          payload: userId
        })
        if (from === "sign-up") {
          nav.navigate('Slider')
        } else {
          nav.navigate('Main')
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
      console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;})
  }
}
