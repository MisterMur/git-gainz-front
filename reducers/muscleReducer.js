import {
	SET_MUSCLES,FETCH_MUSCLES_BEGIN,
	FETCH_MUSCLES_SUCCESS,FETCH_MUSCLES_FAILURE,
} from '../constants/types'


const initialState={
	muscles:[],
	loading:false,
	error:null,

}


export default function muscleReducer(state=initialState,action){
  switch(action.type){
		case FETCH_MUSCLES_BEGIN:
			return {...state,loading:true}
		case FETCH_MUSCLES_SUCCESS:
			return {...state,muscles:action.payload,loading:false}
		case FETCH_MUSCLES_FAILURE:
			return {...state,loading:false,error:action.payload.error}
    default:
      return state;
  }
}
