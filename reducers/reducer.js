import {ADD_WORKOUT,FETCH_SCHEDULES_SUCCESS,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,ADD_NEW_SCHEDULE,SET_WORKOUTS} from '../constants/types.js'

const initialState={
  workouts:[],
  schedules:[],
  loading:false,
  error:null


}
function reducer(state=initialState,action){
  // console.log('%c reducer:', 'color: orange', action);
  switch(action.type){
    case FETCH_SCHEDULES_BEGIN:
      console.log('fetch begin')
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_SCHEDULES_SUCCESS:
      console.log('fetch success')
      return {
        ...state,
        loading:false,
        schedules:action.payload.schedules
      }
    case FETCH_SCHEDULES_FAILURE:
      console.log('fetch failure')
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        schedules:[]
      }
    case ADD_NEW_SCHEDULE:
      return {
        ...state,schedules:[...state.schedules,action.payload]
      }
    case SET_WORKOUTS:
      return{
        ...state,workouts:[...state.workouts,action.payload]
      }
    default:
      console.log('no action type found')
      return state;
  }
}
export function setWorkouts(workouts){
  return{
    type:SET_WORKOUTS,
    payload:workouts
  }
}

export function addWorkout(workout){
  return {
    type:ADD_WORKOUT,
    payload:workout
  }
}
export function fetchSchedules(){
  const schedulesUrl='http://localhost:3000/api/v1/schedules'
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(schedulesUrl)
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
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
  const userUrl='http://localhost:3000/api/v1/schedules'
  // console.log('in handle add schedule',e)
  return dispatch=>{
    return fetch(userUrl,{
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
export const fetchSchedulesBegin=()=>({
  type:FETCH_SCHEDULES_BEGIN
})
export const fetchSchedulesSuccess=(schedules)=>{
  // console.log('fetch success: ',schedules)
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

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
export default reducer
