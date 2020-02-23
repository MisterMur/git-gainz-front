//adapter/circuitAdapter

//react imports
import {AsyncStorage} from 'react-native'

//constant imports
import {API_URL} from '../constants/types.js'


export default class CircuitAdapter{
	static async fetchCircuits() {
		const item = await AsyncStorage.getItem('access_token')
		return fetch(`${API_URL}circuits`, {
			method: "GET",
			headers: {
				Authorization: item
			}
			})
			.then(res => res.json())
	}
	static async deleteCircuit(circuit) {
		const item = await AsyncStorage.getItem('access_token')
		return fetch(`${API_URL}circuits/${circuit.id}`, {
			method: "DELETE",
			headers: {
				Authorization: item
			}
			})
			.then(this.handleErrors)
	}

	static async postCircuit(circuit){
		const userToken = await AsyncStorage.getItem('access_token')
		return fetch(API_URL+'circuits',{
			method:"POST",
			headers:{
				'Content-Type':'application/json',
				'Accepts':'application/json',
				'Authorization':userToken
			},
			body:JSON.stringify({circuit})
		}).then(res=>res.json())
		.then(this.handleErrors)

	}



	handleErrors(response) {
		console.error('in handle errors, response:', response)
		if (!response.ok) {

			throw Error(response.statusText);
		}
		return response;
	}


}
