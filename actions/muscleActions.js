
//constant imports
import {
  FETCH_MUSCLES_BEGIN,FETCH_MUSCLES_SUCCESS,
  FETCH_MUSCLES_FAILURE,RESET_MUSCLES,
	SET_MUSCLES,
} from '../constants/types.js'

//adapter imports
import MuscleAdapter from '../adapters/muscleAdapter.js'


export function fetchMusclesBegin(){
  return {
    type:FETCH_MUSCLES_BEGIN,
  }
}
export function fetchMusclesFailure(error){
  return {
    type:FETCH_MUSCLES_FAILURE,
    payload:error
  }
}
export function fetchMusclesSuccess(muscles){
  return {
    type:FETCH_MUSCLES_SUCCESS,
    payload: muscles,
  }
}

export function fetchMuscles(){
  return (dispatch)=>{
    return MuscleAdapter.fetchMuscles()
    .then(muscles=>{
      dispatch(fetchMusclesSuccess(muscles))
      return muscles
    })
    .catch(error=>dispatch(fetchMusclesFailure(error)))
  }
}
