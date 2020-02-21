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

	static async fetchMuscleSetsData(completedWorkout) {
	  const item = await AsyncStorage.getItem('access_token')
	  return fetch(`${API_URL}user_workouts/${completedWorkout.id}/muscle_sets_data`, {
	    method: "GET",
	    headers: {
	      Authorization: item
	    }
	    })
	    .then(res => res.json())
  }

	static async fetchMuscleRepsData(completedWorkout) {
		const item = await AsyncStorage.getItem('access_token')
		return fetch(`${API_URL}user_workouts/${completedWorkout.id}/muscle_reps_data`, {
			method: "GET",
			headers: {
				Authorization: item
			}
			})
			.then(res => res.json())
	}


 	static async postExerciseMuscle(exercise,muscles){
		  const item  = await AsyncStorage.getItem('access_token')
			return muscles.map(m=>{
				fetch(API_URL+`exercise_muscles`,{
					method:"POST",
					headers:{
						'Content-Type':'application/json',
						'Accepts':'application/json',
						Authorization:item
					},
					body:JSON.stringify({
						exercise_id:exercise.id,
						muscle_id:m.id
					})
				})
				.then(res=>{return res.json() })
			})

	}

  static async postWorkoutExercise(exercise,currentWorkout,muscles){
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
      })

    })
		.then(res=>res.json())
		.then(ex=>{
			return muscles.map(m=>{
				fetch(API_URL+`exercise_muscles`,{
					method:"POST",
					headers:{
						'Content-Type':'application/json',
						'Accepts':'application/json',
						Authorization:item
					},
					body:JSON.stringify({
						exercise_id:ex.exercise_id,
						muscle_id:m.id
					})
				})
				.then(res=>{return res.json() })
			})
		})
		.then(this.handleErrors)
  }

	static async updateResetWorkout(workout){
		const userToken = await AsyncStorage.getItem('access_token')
		return fetch(`${API_URL}workouts/${workout.id}`,{
			method:"PATCH",
			headers:{
				'Content-Type':'application/json',
				'Accepts':'application/json',
				'Authorization':userToken
			},
			body:JSON.stringify({
				workout,
				// user_id:userToken.split(':')[0]
			})
		}).then(this.handleErrors)

	}



  static async addCompletedWorkout(completedWorkout){
    const userToken = await AsyncStorage.getItem('access_token')
    return fetch(API_URL+'user_workouts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json',
        'Authorization':userToken
      },
      body:JSON.stringify({completedWorkout,user_id:userToken.split(':')[0]})
    }).then(this.handleErrors)
		// .then(this.updateResetWorkout(completedWorkout))

  }





  static async addNewWorkout(workout,schedule){
    const userToken = await AsyncStorage.getItem('access_token')
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
    .then(workoutRes=>{
      return fetch( API_URL+'workout_schedules',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json',
          'Authorization':userToken
        },
        body:JSON.stringify({
          schedule_id:schedule.id,
          workout_id:workoutRes.id
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
