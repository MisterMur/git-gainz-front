//actions/workoutActions.js

//constants imports
import {API_URL} from '../constants/types.js'
import {
  ADD_NEW_WORKOUT,SET_WORKOUTS,SET_CURRENT_WORKOUT,
  FETCH_WORKOUTS_BEGIN,FETCH_WORKOUTS_SUCCESS,
  FETCH_WORKOUTS_FAILURE,

  ADD_COMPLETEDWORKOUT,
  FETCH_COMPLETEDWORKOUTS_BEGIN,
  FETCH_COMPLETEDWORKOUTS_SUCCESS,
  FETCH_COMPLETEDWORKOUTS_FAILURE,
  SET_COMPLETEDWORKOUTS,RESET_WORKOUTS,
	STARTSTOP_WORKOUT,START_WORKOUT,STOP_WORKOUT,
	ADD_CIRCUIT,DELETE_CIRCUIT,


} from '../constants/types.js'

//adapter imports
import WorkoutAdapter from '../adapters/workoutAdapter.js'
import ScheduleAdapter from '../adapters/scheduleAdapter.js'
import UserAdapter from '../adapters/userAdapter.js'
import CircuitAdapter from '../adapters/circuitAdapter.js'
//actions imports
import {fetchSchedulesFailure,fetchMySchedules} from './scheduleActions.js'
import {fetchExercisesSuccess,fetchExercisesFailure} from './exerciseActions.js'
import {deleteAllCircuits} from './circuitActions.js'

export function setWorkouts(workouts){
  return{
    type:SET_WORKOUTS,
    payload:workouts
  }
}
export function resetWorkouts(){
  return {
    type:RESET_WORKOUTS,

  }
}
export function setCurrentWorkout(workout){
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
  return {

    type:FETCH_WORKOUTS_SUCCESS,
    payload: workouts
  }
}
export function fetchWorkoutsFailure(error){
  console.error('fetch workouts failure,',error)
  return {

    type:FETCH_WORKOUTS_FAILURE,
    payload:{error}
  }
}
export function fetchCompletedWorkoutsBegin(){
  return {
    type:FETCH_COMPLETEDWORKOUTS_BEGIN,
  }
}
export function fetchCompletedWorkoutsFailure(error){
  return {
    type:FETCH_COMPLETEDWORKOUTS_FAILURE,
    payload:{error}
  }
}
export function fetchCompletedWorkoutsSuccess(completedWorkouts){
  return {
    type:FETCH_COMPLETEDWORKOUTS_SUCCESS,
    payload: {completedWorkouts},
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
    .then(sched=>{
      dispatch(fetchWorkoutsSuccess(sched.workouts))
      return sched.workouts
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
  return (dispatch)=>{
    dispatch({type:ADD_NEW_WORKOUT,payload:{workout}})
    return WorkoutAdapter.addNewWorkout(workout,schedule)
    .then(function (){
      dispatch(fetchSchedulesWorkouts(schedule))
    })
  }
}

export function startStopWorkout(){
	return dispatch=>{
		dispatch({type:STARTSTOP_WORKOUT})
	}
}
export function startWorkout(){
	return dispatch=>{
		dispatch({type:START_WORKOUT})
	}
}
export function stopWorkout(){
	return dispatch=>{
		dispatch({type:STOP_WORKOUT})
	}
}
export function addCircuit(circuit){
  return dispatch=>{
    return WorkoutAdapter.postCircuit(circuit)
    .then(function(){
			dispatch({type:ADD_CIRCUIT,payload:circuit})
      // dispatch(fetchWorkoutsExercises(currentWorkout))
    })
  }
}

export function postNewCompleteWorkout(completedWorkout,circuits){
  return (dispatch)=>{
    return WorkoutAdapter.addCompletedWorkout(completedWorkout)
  .then(function(){
    dispatch({type:ADD_COMPLETEDWORKOUT,payload:completedWorkout})
    dispatch(fetchCompletedWorkouts())
  })
	// .then(
	// 	circuits.map(c=>
	// 		 CircuitAdapter.deleteCircuit(c)
	// 		.then(function(){
	// 			dispatch({type:DELETE_CIRCUIT,payload:c})
	// 		})
	// 	)
	// )
	// .then(deleteAllCircuits(circuits))
  }
}
export function fetchCompletedWorkouts(){
  return (dispatch)=>{
    return UserAdapter.fetchCurrentUser()
		.then(user=>{
      dispatch(fetchCompletedWorkoutsSuccess(user.user_workouts))
      return user.user_workouts
    })
    .catch(error=>{
			console.error('error fetchingcompletedworkouts',error)
			dispatch(fetchCompletedWorkoutsFailure(error))})
  }
}

function handleErrors(response) {
  console.error('in handle errors, response:', response)
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}
