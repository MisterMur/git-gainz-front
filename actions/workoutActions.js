import {fetchSchedulesFailure} from './scheduleActions.js'
import {fetchExercisesSuccess,fetchExercisesFailure} from './exerciseActions.js'
import {API_URL} from '../constants/types.js'
import {ADD_NEW_WORKOUT,SET_WORKOUTS,SET_CURRENT_WORKOUT,FETCH_WORKOUTS_BEGIN,FETCH_WORKOUTS_SUCCESS,FETCH_WORKOUTS_FAILURE} from '../constants/types.js'
import WorkoutAdapter from '../adapters/workoutAdapter.js'

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
export function fetchWorkoutsBegin(){
  type:FETCH_WORKOUTS_BEGIN
}
export function fetchWorkoutsSuccess(workouts){
  // console.log('fetch success: ',schedules)
  return {

    type:FETCH_WORKOUTS_SUCCESS,
    payload: workouts
  }
}
export function fetchWorkoutsFailure(error){
  return {

    type:FETCH_WORKOUTS_FAILURE,
    payload:{error}
  }
}

export function fetchWorkouts(){
  return dispatch=>{
    return WorkoutAdapter.getWorkouts()
    .then(workouts=>{
      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function fetchSchedulesWorkouts(schedule){
  return dispatch=>{
    return ScheduleAdapter.getSchedulesWorkouts(schedule)
    .then(workouts=>{

      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchWorkoutsFailure(error)))
  }
}

export function fetchWorkoutsExercises(workout){
  return dispatch=>{
    return WorkoutAdapter.getWorkoutsExercises(workout)
        .then(exercises=>{
          dispatch(fetchExercisesSuccess(exercises))
          return exercises
        })
        .catch(error=>
          dispatch(fetchExercisesFailure(error))
        )
  }
}
export function postNewWorkout(workout,schedule){
  // const scheduleUrl='http://localhost:3000/api/v1/schedules'
  // console.log('in handle add schedule',e)
  return (dispatch)=>{
    // console.log('in workout actions posting workout',workout)
    return WorkoutAdapter.addNewWorkout(workout,schedule)
    .then(function (){
      dispatch({type:ADD_NEW_WORKOUT,payload:{workout}})

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
