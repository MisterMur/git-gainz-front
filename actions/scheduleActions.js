// import { createActions ,handleActions} from 'redux-actions';
import {API_URL} from '../constants/types.js'
import {ADD_NEW_SCHEDULE,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_SUCCESS,FETCH_SCHEDULES_FAILURE}  from '../constants/types.js'
// import axios from 'axios'
import ScheduleAdapter from '../adapters/scheduleAdapter.js'
import UserAdapter from '../adapters/userAdapter.js'

import {AsyncStorage} from 'react-native'

export const setCurrentSchedule=(schedule)=>({
  // console.log('in setcurrent schedule',schedule)

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
// export function fetchSchedules() {
//   return function action(dispatch) {
//     dispatch({ type: FETCH_SCHEDULES_BEGIN })
//     const item =  AsyncStorage.getItem('user')
//
//
//     const request = axios({
//       method: 'GET',
//       url: `${API_URL}/schedules`,
//       headers: {Authorization:item}
//     });
//
//     return request.then(
//       response => dispatch(fetchSchedulesSuccess(response)),
//       err => dispatch(fetchSchedulesFailure(err))
//     );
//   }
// }
// export  function fetchSchedules(){
//   // const schedulesUrl='http://localhost:3000/api/v1/schedules'
//   const item =  AsyncStorage.getItem('user_id')
//   console.log('async storage item',item)
//   return dispatch=>{
//     // dispatch(fetchSchedulesBegin())
//
//     console.log('in fetchschedules reducer: ',API_URL+'schedules')
//     return fetch(API_URL+'schedules',{
//       method:"GET",
//       headers:{Authorization:item}
//     })
//     .then(handleErrors)
//     .then(res=>{
//       console.log('res',res)
//       return res.json()
//     })
//     .then(schedules=>{
//       // console.log('schedules *************',schedules)
//       dispatch(fetchSchedulesSuccess(schedules))
//       return schedules
//     })
//     .catch(error=> dispatch(fetchSchedulesFailure(error)))
//   }
// }
export function addNewCircuit(exercise,currentWorkout){
  // addWorkout(workout)
  // console.log('***********************exercise',exercise)
  return dispatch=>{
    console.log('exercise action add new circuit ',currentWorkout)
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
      dispatch(addNewSchedule(schedule))

    })

  }
}
// const scheduleREducer = handleAction(
//   ADD_TODO,
//   (state, action) => {
//     return {
//       ...state,
//       currentTodo: '',
//       todos: state.todos.concat(action.payload)
//     }
//   },
//   initState
// )
