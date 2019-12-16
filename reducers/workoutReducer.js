import {FETCH_USER_WORKOUTS_BEGIN,FETCH_USER_WORKOUTS_SUCCESS,FETCH_EXERCISES_BEGIN,FETCH_EXERCISES_SUCCESS,FETCH_EXERCISES_FAILURE,FETCH_CIRCUITS_SUCCESS,FETCH_CIRCUITS_FAILURE,FETCH_WORKOUTS_BEGIN,FETCH_WORKOUTS_SUCCESS,FETCH_WORKOUTS_FAILURE,ADD_NEW_WORKOUT,SET_WORKOUTS,SET_CURRENT_WORKOUT} from '../constants/types.js'

const initialState={
  workouts:[],

  loading:false,
  error:null,
  currentWorkout:null,
  // currentUser:{id:29,name:'Brad',password:'1234'}
}


export default function workoutReducer(state=initialState,action){
  // console.log('%c Workout reducer:', 'color: orange', action);

  switch(action.type){
    case FETCH_WORKOUTS_BEGIN:
      // console.log('fetch begin')
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_WORKOUTS_SUCCESS:
      // console.log('fetch success')
      return {
        ...state,
        loading:false,
        currentSchedule:{
          ...state.currentSchedule,
          workouts:action.payload.workouts
        },
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
            ...state,workouts:[...state.workouts,action.payload]
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
          // console.log('fetch begin')
          return {...state,
            loading:true,
            error:null
          }
        case FETCH_USER_WORKOUTS_SUCCESS:
          // console.log('fetch success')
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

        default:
          // console.log('no action type found')
          return state;
      }
  }
