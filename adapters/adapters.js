import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class UserAdapter {
  static async getUsers() {
  const item = await AsyncStorage.getItem('user_id')
  console.log('in user adapter',item)
  return fetch(`${API_URL+`users`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }

}
