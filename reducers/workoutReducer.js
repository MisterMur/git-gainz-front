import {
  FETCH_USER_WORKOUTS_BEGIN,FETCH_USER_WORKOUTS_SUCCESS,
  FETCH_EXERCISES_BEGIN,FETCH_EXERCISES_SUCCESS,
  FETCH_EXERCISES_FAILURE,FETCH_CIRCUITS_SUCCESS,
  FETCH_CIRCUITS_FAILURE,FETCH_WORKOUTS_BEGIN,
  FETCH_WORKOUTS_SUCCESS,FETCH_WORKOUTS_FAILURE,
  ADD_NEW_WORKOUT,SET_WORKOUTS,SET_CURRENT_WORKOUT,
  RESET_WORKOUTS,STARTSTOP_WORKOUT,START_WORKOUT,
	STOP_WORKOUT,
} from '../constants/types.js'
import {LOGOUT} from '../constants/authTypes'

const initialState={
  workouts:[],
	inProgress:false,
  loading:false,
  error:null,
  currentWorkout:null,
	startTime:null,
	endTime:null,
	duration:null,
}


export default function workoutReducer(state=initialState,action){

  switch(action.type){
		case START_WORKOUT:
			return {
				...state,
				inProgress:true,
				startTime:Date.now(),
			}
		case STOP_WORKOUT:
			return {
				...state,
				inProgress:false,
				endTime:Date.now(),
				duration:Date.now()-state.startTime,
			}

		case STARTSTOP_WORKOUT:
			if(!state.inProgress){
				return{
					...state,
					inProgress:!state.inProgress,
					startTime:Date.now()
				}
			}else if (state.inProgress){
				return{
					...state,
					inProgress:!state.inProgress,
					endTime:Date.now(),
					duration:Date.now()-state.startTime,
				}
			}
    case RESET_WORKOUTS:
      return{
        ...state,
        workouts:[],
      }
    case FETCH_WORKOUTS_BEGIN:
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_WORKOUTS_SUCCESS:
      return {
        ...state,
        loading:false,
        currentSchedule:{
          ...state.currentSchedule,
          workouts:action.payload
        },
        workouts:action.payload,
      }
      case FETCH_WORKOUTS_FAILURE:
        return {
          ...state,
          loading:false,
          error:action.payload.error,
          workouts:[]
        }
        case ADD_NEW_WORKOUT:

          return{
            ...state,
            currentSchedule:{
              ...state.currentSchedule,
              workouts:[...state.workouts,action.payload.workout]
            },
            workouts:[...state.workouts,action.payload.workout]
          }
        case SET_WORKOUTS:
          return{
            ...state,workouts:[...state.workouts,action.payload]
          }
        case SET_CURRENT_WORKOUT:
          return{
            ...state,currentWorkout:action.payload
          }

        case FETCH_USER_WORKOUTS_BEGIN:
          return {...state,
            loading:true,
            error:null
          }
        case FETCH_USER_WORKOUTS_SUCCESS:
          return {
            ...state,
            loading:false,
            userWorkouts:action.payload.workouts
          }

        case FETCH_EXERCISES_BEGIN:
          return {
            ...state,
            loading:true,
            error:null
          }
        case FETCH_EXERCISES_SUCCESS:
          return{
            ...state,
            loading:false,
            currentWorkout:{
              ...state.currentWorkout,
              exercises:action.payload.exercises
            },
          }
        case FETCH_EXERCISES_FAILURE:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            exercises:[]
          }
        case FETCH_CIRCUITS_SUCCESS:
          return {
            ...state,
            loading:false,
            currentExercise:{
              ...state.currentExercise,
              circuits:action.payload.circuits
            }
          }
        case FETCH_CIRCUITS_FAILURE:
          return {
            ...state,
            loading:false,
            error:action.payload.error,
            circuits:[]
          }
        case LOGOUT:
          return{
            workouts:[],

            loading:false,
            error:null,
            currentWorkout:null,
          }

        default:

          return state;
      }
  }
