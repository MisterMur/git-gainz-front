import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class ScheduleAdapter {
  static async getUsers() {
  const item = await AsyncStorage.getItem('user_id')
  console.log('in user adapter',item)
  return fetch(`${API_URL+`schedules`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }


}
