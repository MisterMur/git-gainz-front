import {API_URL} from '../constants/types.js'

export function fetchExercises(){
  // const exercisesUrl = 'http://localhost:3000/api/v1/exercises'
  return dispatch=>{
    return fetch(API_URL+`exercises`)
      .then(handleErrors)
      .then(res=>{
        return res.json()
      })
      .then(exercises=>{
        dispatch(fetchExercisesSuccess(exercises))
        return exercises
      })
      .catch(error=> dispatch(fetchExercisesFailure(error)))


  }
}



export function postNewExercise(exercise,currentWorkout){
  // addWorkout(workout)
  // console.log('***********************exercise',exercise)
  return dispatch=>{
    return fetch(API_URL+'exercises',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
          exercise
        }
      )
    })
    .then(res=>{return res.json() })
    .then(exer=>{

      // console.log('res exercise id',exer)
      return fetch( API_URL+'workout_exercises',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json'
        },
        body:JSON.stringify({
          workout_id:currentWorkout.id,
          exercise_id:exer.id
        })
      }).then(handleErrors)
  })
    .then(handleErrors)
    .then(function(){
      dispatch(fetchWorkoutsExercises(currentWorkout))
    })
  }
}
function handleErrors(response) {
  console.log('in handle errors, response:', response)
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}
