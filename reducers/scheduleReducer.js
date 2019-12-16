import {SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_SUCCESS,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,ADD_NEW_SCHEDULE,FETCH_SCHEDULES_WORKOUTS} from '../constants/types.js'

const initialState={
  // workouts:[],
  schedules:[],
  loading:false,
  error:null,
  currentSchedule:null,
  // currentWorkout:null,
  // currentUser:{id:29,name:'Brad',password:'1234'}
}


export default function scheduleReducer(state=initialState,action){
  // console.log('%c Schedule reducer:', 'color: orange', action);
  switch(action.type){
    case FETCH_SCHEDULES_BEGIN:
      console.log('fetch begin')
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_SCHEDULES_SUCCESS:
      console.log('fetch success',action.payload)
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

    case FETCH_SCHEDULES_WORKOUTS:
      console.error('reducer current schedule',action.payload.currentSchedule)
      return {
        ...state,
        currentSchedule:action.payload.currentSchedule
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

    default:
      // console.log('no action type found')
      return state;
  }
}




//////////////////////
//// Schedule actions?
//////////////////////////
// export function fetchSchedules(){
//   // const schedulesUrl='http://localhost:3000/api/v1/schedules'
//   return dispatch=>{
//     // dispatch(fetchSchedulesBegin())
//     console.log('in fetchschedules reducer')
//     return fetch(apiUrl+'schedules')
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
//
// export function setCurrentSchedule(schedule){
//   // console.log('in setcurrent schedule',schedule)
//   return {
//       type: SET_CURRENT_SCHEDULE,
//       payload:schedule
//     }
//
// }
// export function postNewSchedule(schedule){
//   // const scheduleUrl='http://localhost:3000/api/v1/schedules'
//   // console.log('in handle add schedule',e)
//   return dispatch=>{
//     return fetch(apiUr+'schedules',{
//       method:"POST",
//       headers:{
//         'Content-Type':'application/json',
//         'Accepts':'application/json'
//       },
//       body:JSON.stringify({
//         schedule
//       })
//     })
//     .then(handleErrors)
//   }
// }
