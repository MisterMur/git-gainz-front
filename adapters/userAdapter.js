import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export  default class UserAdapter {
  static async getUsers() {
  const item = await AsyncStorage.getItem('user_id')

  return fetch(`${API_URL+`users`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }
  static async getUserSchedules() {
  const item = await AsyncStorage.getItem('access_token')
  const userId = await AsyncStorage.getItem('user_id')
  return fetch(API_URL+`users/${userId[0]}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }

}
