import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export  default class UserAdapter {
  static async getUsers() {
  const token = await AsyncStorage.getItem('access_token')

  return fetch(`${API_URL+`users`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }

  static async addNewUser(user){
    const token = await AsyncStorage.getItem('access_token')
    return fetch(API_URL+`users`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        'Authorization':token,
      },body:JSON.stringify({user})
    }).then(this.handleErrors)
    .then(res=>res.json)

  }

  static async getUserSchedules() {
  const token = await AsyncStorage.getItem('access_token')
  return fetch(API_URL+`users/${token.split(':')[0]}`, {
    method: "GET",
    headers: {
      Authorization: token
    },
  }).then(this.handleErrors)
    .then(res => res.json())
  }
  static async isLoggedIn(){
    const token = await AsyncStorage.getItem('access_token')
    if (token){
      return true
    }
    else{
      return false}
  }
  handleErrors(response) {
    console.log('in handle errors, response:', response)
    if (!response.ok) {

      throw Error(response.statusText);
    }
    return response;

}
