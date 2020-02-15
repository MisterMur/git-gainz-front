import {
  SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_SUCCESS,
  FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,
  ADD_NEW_SCHEDULE,FETCH_SCHEDULES_WORKOUTS,RESET_SCHEDULES,
} from '../constants/types.js'
import {LOGOUT} from '../constants/authTypes'
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
  switch(action.type){
    case RESET_SCHEDULES:
      return {
        ...state,
        schedules:[],
      }
    case FETCH_SCHEDULES_BEGIN:
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_SCHEDULES_SUCCESS:
      return {
        ...state,
        loading:false,
        schedules:action.payload.schedules
      }
    case FETCH_SCHEDULES_FAILURE:
      console.error('fetch failure')
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
        ...state,schedules:[...state.schedules,action.payload.schedule]
      }

    case SET_CURRENT_SCHEDULE:
      return {
        ...state,currentSchedule:action.payload.schedule
      }
    case LOGOUT:
      return{
        schedules:[],
        loading:false,
        error:null,
        currentSchedule:null,

      }

    default:
      return state;
  }
}
