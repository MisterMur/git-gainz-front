

import {
	ADD_CIRCUIT,FETCH_CIRCUITS_BEGIN,
	FETCH_CIRCUITS_SUCCESS,FETCH_CIRCUITS_FAILURE,
	DELETE_CIRCUIT,RESET_CIRCUITS,
} from '../constants/types.js'
const initialState={
	circuits:[],
	loading:false,
	error:null,
}
export default function circuitReducer(state=initialState,action){
	switch(action.type){
		case ADD_CIRCUIT:
			return{
				...state,
				circuits:[...state.circuits,action.payload]
			}
		case DELETE_CIRCUIT:
			return {
				...state,
				circuits:state.circuits.filter( item=> item != action.payload  )
			}
		case FETCH_CIRCUITS_BEGIN:
			return{
				...state,
				loading:true,
			}
		case FETCH_CIRCUITS_SUCCESS:
			return{
				...state,
				loading:false,
				circuits:action.payload
			}
		case FETCH_CIRCUITS_FAILURE:
			return{
				...state,
				loading:false,
				error:action.payload,
			}
		case RESET_CIRCUITS:
			return{
				...state,
				circuits:[],
			}
		default:
			return state;
	}
}
