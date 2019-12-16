import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export  default class WorkoutAdapter {
  static async getWorkouts() {
  const item = await AsyncStorage.getItem('user_id')
  return fetch(`${API_URL+`workouts`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }
  static async getWorkoutsExercises(workout){
    const item = await AsyncStorage.getItem('user_id')
    return fetch(API_URL+`workouts/${workout.id}`,{
      method:"GET",
      headers:{
        Authorization:item
      }
    })
      .then(this.handleErrors)
      .then(res=>res.json())
  }



  static async postWorkoutExercise(exercise,currentWorkout){
    const item  = await AsyncStorage.getItem('user_id')
    return fetch(API_URL+`exercises`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        Authorization:item
      },
      body:JSON.stringify({exercise})
    })
    .then(res=>{return res.json() })
    .then(exer=>{

      return fetch( API_URL+'workout_exercises',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json',
          Authorization:item
        },
        body:JSON.stringify({
          workout_id:currentWorkout.id,
          exercise_id:exer.id
        })
      }).then(this.handleErrors)
    }).then(this.handleErrors)


  }

  handleErrors(response) {
    console.log('in handle errors, response:', response)
    if (!response.ok) {

      throw Error(response.statusText);
    }
    return response;
  }

}
