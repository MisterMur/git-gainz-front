import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export default class MuscleAdapter {
  static async fetchMuscles() {
  const item = await AsyncStorage.getItem('access_token')
  return fetch(`${API_URL+`muscles`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }



	handleErrors(response) {
		console.error('in handle errors, response:', response)
		if (!response.ok) {

			throw Error(response.statusText);
		}
		return response;
	}


}
