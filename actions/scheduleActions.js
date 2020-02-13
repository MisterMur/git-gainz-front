// import { createActions ,handleActions} from 'redux-actions';
import {API_URL} from '../constants/types.js'
import {ADD_NEW_SCHEDULE,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_SUCCESS,FETCH_SCHEDULES_FAILURE}  from '../constants/types.js'
// import axios from 'axios'
import ScheduleAdapter from '../adapters/scheduleAdapter.js'
import UserAdapter from '../adapters/userAdapter.js'

import {AsyncStorage} from 'react-native'

export const setCurrentSchedule=(schedule)=>({
    type: SET_CURRENT_SCHEDULE,
    payload:{schedule}

})



export const fetchSchedulesBegin=()=>({
  type:FETCH_SCHEDULES_BEGIN
})
export const fetchSchedulesSuccess=(schedules)=>{
  return {

    type:FETCH_SCHEDULES_SUCCESS,
    payload: {schedules}
  }
}
export const fetchSchedulesFailure=(error)=>({
  type:FETCH_SCHEDULES_FAILURE,
  payload:{error}
})

export const addNewSchedule=(schedule)=>({
  type:ADD_NEW_SCHEDULE,
  payload:{schedule}
})
export function fetchMySchedules(){
  return (dispatch)=>{
    return UserAdapter.getUserSchedules()
    .then(user=>{
      dispatch(fetchSchedulesSuccess(user.schedules))
      return user.schedules
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function addNewCircuit(exercise,currentWorkout){

  return dispatch=>{
    return WorkoutAdapter.postWorkoutExercise(exercise,currentWorkout)
    .then(function(){
      dispatch(fetchWorkoutsExercises(currentWorkout))
    })
  }
}
export function postNewSchedule(schedule){

  return (dispatch)=>{
    return ScheduleAdapter.addNewSchedule(schedule)
    .then(function (){
      // dispatch(addNewSchedule(schedule))
      dispatch({type:ADD_NEW_SCHEDULE,payload:{schedule}})
      fetchMySchedules()

    })

  }
}
