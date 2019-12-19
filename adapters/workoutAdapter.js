import {AsyncStorage} from 'react-native'
import {API_URL} from '../constants/types.js'

export  default class WorkoutAdapter {
  static async getWorkouts() {
  const item = await AsyncStorage.getItem('access_token')
  return fetch(`${API_URL+`workouts`}`, {
    method: "GET",
    headers: {
      Authorization: item
    }
    })
    .then(res => res.json())
  }
  static async getWorkoutsExercises(workout){
    const item = await AsyncStorage.getItem('access_token')
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
    const item  = await AsyncStorage.getItem('access_token')
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


  static async addCompletedWorkout(workout){
    const userToken = await AsyncStorage.getItem('access_token')
    return fetch(API_URL+'user_workouts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        'Authorization':userToken
      },
      body:JSON.stringify({workout,user_id:usertoken[0]})
    }).then(this.handleErrors)

  }

  static async addNewWorkout(workout,schedule){
    const userToken = await AsyncStorage.getItem('access_token')
    console.log('in add new workout' , schedule    )
    return fetch(API_URL+'workouts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        'Authorization':userToken
      },
      body:JSON.stringify({
          workout
        }
      )
    })
    .then(res=>res.json())
    .then(workout=>{
      return fetch( API_URL+'workout_schedules',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json',
          'Authorization':userToken
        },
        body:JSON.stringify({
          schedule_id:schedule.id,
          workout_id:workout.id
        })
      }).then(this.handleErrors)
    }).then(this.handleErrors)

  }

  handleErrors(response) {
    console.error('in handle errors, response:', response)
    if (!response.ok) {

      throw Error(response.statusText);
    }
    return response;
  }

}
