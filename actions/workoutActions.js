import {fetchSchedulesFailure} from './scheduleActions.js'
import {fetchExercisesSuccess,fetchExercisesFailure} from './exerciseActions.js'
import {API_URL} from '../constants/types.js'

export function setWorkouts(workouts){
  // console.log('in setworkouts',workouts)
  return{
    type:SET_WORKOUTS,
    payload:workouts
  }
}
export function setCurrentWorkout(workout){
  // console.log('in set current workout',workout)
  return {
    type: SET_CURRENT_WORKOUT,
    payload:workout
  }
}

export function addWorkout(workout){
  return {
    type:ADD_NEW_WORKOUT,
    payload:{workout}
  }
}

export function fetchWorkouts(){
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(API_URL+'workouts')
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
      return res.json()
    })
    .then(workouts=>{
      // console.warn('fetch workouts',workouts)
      // console.log('schedules *************',schedules)
      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function fetchSchedulesWorkouts(schedule){
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(API_URL+`schedules/${schedule.id}`)
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
      return res.json()
    })
    .then(workouts=>{
      // console.warn('fetch schedules workouts',workouts)
      // console.log('schedules *************',schedules)
      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchWorkoutsFailure(error)))
  }
}
export function fetchWorkoutsExercises(workout){
  return dispatch=>{
    return fetch(API_URL+`workouts/${workout.id}`)
    .then(handleErrors)
    .then(res=>res.json())
    .then(exercises=>{
      dispatch(fetchExercisesSuccess(exercises))
      return exercises
    })
    .catch(error=>
      dispatch(fetchExercisesFailure(error))
    )
  }
}
function handleErrors(response) {
  console.log('in handle errors, response:', response)
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}
