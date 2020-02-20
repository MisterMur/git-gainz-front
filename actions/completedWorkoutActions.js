import {API_URL} from '../constants/types.js'
import {
  FETCH_COMPLETEDWORKOUTS_BEGIN,
  FETCH_COMPLETEDWORKOUTS_SUCCESS,
  FETCH_COMPLETEDWORKOUTS_FAILURE,
  ADD_COMPLETED_WORKOUT,
  SET_COMPLETEDWORKOUTS,
	FETCH_MUSCLEREPS,FETCHMUSCLESETS

} from '../constants/types.js'

import UserAdapter from '../adapters/userAdapter.js'
import WorkoutAdapter from '../adapters/workoutAdapter.js'

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
    payload: completeworkouts,
  }
}

export function fetchCompletedWorkouts(){
  return (dispatch)=>{
    return UserAdapter.fetchCurrentUser()
    .then(user=>{
      dispatch(fetchCompletedWorkoutsSuccess(user.user_workouts))
      return user.user_workouts
    })
    .catch(error=>dispatch(fetchCompletedWorkoutsFailure(error)))
  }
}
export function addCompletedWorkout(workout){
  return (dispatch)=>{
    return WorkoutAdapter.addCompletedWorkout(workout)
  .then(function(){
    dispatch(fetchCompletedWorkouts(currentUser))
  })
  }
}
export function fetchMuscleRepsData(completedWorkout){
  return (dispatch)=>{
    return WorkoutAdapter.fetchMuscleRepsData(completedWorkout)
  .then(data=>   dispatch({type:FETCH_MUSCLEREPS,payload:data}) )
  }
}

export function fetchMuscleSetsData(completedWorkout){
  return (dispatch)=>{
    return WorkoutAdapter.fetchMuscleSetsData(completedWorkout)
  .then(data=>   dispatch({type:FETCH_MUSCLESETS,payload:data}) )
  }
}
