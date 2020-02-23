//actions/circuitActions.js
//adapter imports
import CircuitAdapter from '../adapters/circuitAdapter'


//constatn imports
import {
	API_URL,
	ADD_CIRCUIT,DELETE_CIRCUIT,
	FETCH_CIRCUITS_BEGIN,FETCH_CIRCUITS_SUCCESS,
	FETCH_CIRCUITS_FAILURE,RESET_CIRCUITS,
} from '../constants/types.js'

export function resetCircuits(){
  return {
    type:RESET_CIRCUITS,

  }
}

export function addCircuit(circuit){
  return dispatch=>{
    return CircuitAdapter.postCircuit(circuit)
    .then(circ=>
			dispatch({type:ADD_CIRCUIT,payload:circ})
		)
  }
}

export function deleteAllCircuits(circuits){
	return (dispatch)=>{
		return circuits.map(c=>
			 CircuitAdapter.deleteCircuit(c)
			.then(function(){
				dispatch({type:DELETE_CIRCUIT,payload:c})
			})
		)
	}
}

export function deleteCircuit(circuit){
	return dispatch=>{
		return CircuitAdapter.deleteCircuit(circuit)
		.then(function(){
			dispatch({type:DELETE_CIRCUIT,payload:circuit})
		})
	}
}
function handleErrors(response) {
  console.error('in handle errors, response:', response)
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}
