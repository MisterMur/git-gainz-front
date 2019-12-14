import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class ScheduleAdapter {
  static async fetchSchedules() {
  const item = await AsyncStorage.getItem('user_id')
  return fetch(`${API_URL+`schedules`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }

}
