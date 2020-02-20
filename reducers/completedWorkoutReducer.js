import {
  FETCH_COMPLETEDWORKOUTS_BEGIN,
  FETCH_COMPLETEDWORKOUTS_FAILURE,
  FETCH_COMPLETEDWORKOUTS_SUCCESS,
  ADD_COMPLETEDWORKOUT,
  SET_COMPLETEDWORKOUTS,FETCH_MUSCLEREPS,
	FETCH_MUSCLESETS

} from '../constants/types.js'

const initialState={
  completedWorkouts:[],
  error:null,
  loading:false,
	workoutSetsData:[],
	workoutRepsData:[]

}

export default function completedWorkoutReducer(state=initialState,action){
  switch(action.type){
		case FETCH_MUSCLEREPS:
			console.warn('recucer',action.payload)
			return {
				...state,
				workoutSetsData:action.payload
			}
		case FETCH_MUSCLESETS:
		console.warn('reducer',action.payload)

			return {
				...state,
				workoutRepsData:action.payload
			}

    case FETCH_COMPLETEDWORKOUTS_BEGIN:
      return {
        ...state,
        loading:true,
        error:null
      }
    case FETCH_COMPLETEDWORKOUTS_FAILURE:
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        completedWorkouts:[],
      }
    case FETCH_COMPLETEDWORKOUTS_SUCCESS:
      return {
        ...state,
        loading:false,
        completedWorkouts:action.payload.completedWorkouts

      }
    case ADD_COMPLETEDWORKOUT:
      return {
        ...state,
        loading:false,
        completedWorkouts:[...state.completedWorkouts,action.payload]

      }



    default:
      return state;

  }
}
