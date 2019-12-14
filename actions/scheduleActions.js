// import { createActions ,handleActions} from 'redux-actions';
import {API_URL} from '../constants/types.js'
import {ADD_NEW_SCHEDULE,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_SUCCESS,FETCH_SCHEDULES_FAILURE}  from '../constants/types.js'

import {AsyncStorage} from 'react-native'
export function setCurrentSchedule(schedule){
  return {
      type: SET_CURRENT_SCHEDULE,
      payload:schedule
    }
}


export const fetchSchedulesBegin=()=>({
  type:FETCH_SCHEDULES_BEGIN
})
export const fetchSchedulesSuccess=(schedules)=>{
  console.log('fetch success: ',schedules)
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
export function fetchMySchedules(id){
  return (dispatch)=>{
    ScheduleAdapter.fetchSchedules(id)
    .then(userObj => {
     if (userObj.schedules.length > 0) {
       dispatch(fetchSchedulesSuccess(userObj.schedules))
     }
   })
  }
}

export async function fetchSchedules(){
  // const schedulesUrl='http://localhost:3000/api/v1/schedules'
  const item = await AsyncStorage.getItem('user_id')
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())

    console.log('in fetchschedules reducer: ',API_URL+'schedules')
    return fetch(API_URL+'schedules')
    .then(handleErrors)
    .then(res=>{
      console.log('res',res)
      return res.json()
    })
    .then(schedules=>{
      // console.log('schedules *************',schedules)
      dispatch(fetchSchedulesSuccess(schedules))
      return schedules
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}

export function postNewSchedule(schedule){
  // const scheduleUrl='http://localhost:3000/api/v1/schedules'
  // console.log('in handle add schedule',e)
  return dispatch=>{
    return fetch(API_URL+'schedules',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
        schedule
      })
    })
    .then(handleErrors)
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
function handleErrors(response) {
  if (!response.ok) {
    console.log('in handle errors, response:', response)

    throw Error(response.statusText);
  }
  return response;
}
