import {ADD_WORKOUT,FETCH_SCHEDULES_SUCCESS,SET_CURRENT_WORKOUT,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,ADD_NEW_SCHEDULE,SET_WORKOUTS} from '../constants/types.js'

// import store from '../store.js'

const initialState={
  workouts:[],
  schedules:[],
  loading:false,
  error:null,
  currentSchedule:null,
  currentWorkout:null

}

function reducer(state=initialState,action){
  console.log('%c reducer:', 'color: orange', action);
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
    case SET_CURRENT_SCHEDULE:
      console.log('reducer in set current schedule')
      return {
        ...state,currentSchedule:action.payload
      }
    case SET_WORKOUTS:
      return{
        ...state,workouts:[...state.workouts,action.payload]
      }
    case SET_CURRENT_WORKOUT:
    console.log('reducer in set current workout')

      return{
        ...state,currentWorkout:action.payload
      }

    default:
      console.log('no action type found')
      return state;
  }
}


export function setWorkouts(workouts){
  console.log('in setworkouts',workouts)
  return{
    type:SET_WORKOUTS,
    payload:workouts
  }
}
export function setCurrentWorkout(workout){
  console.log('in set current workout',workout)
  return {
    type: SET_CURRENT_WORKOUT,
    payload:workout
  }
}
export function setCurrentSchedule(schedule){
  // console.log('in setcurrent schedule',schedule)
  return {
      type: SET_CURRENT_SCHEDULE,
      payload:schedule
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
