//actions/circuitActions.js
//adapter imports
import CircuitAdapter from '../adapters/circuitAdapter'


//constatn imports
import {
	API_URL,
	ADD_CIRCUIT,FETCH_CIRCUITS_BEGIN,FETCH_CIRCUITS_SUCCESS,
	FETCH_CIRCUITS_FAILURE,
} from '../constants/types.js'



export function addCircuit(circuit){
  return dispatch=>{
    return CircuitAdapter.postCircuit(circuit)
    .then(function(){
			dispatch({type:ADD_CIRCUIT,payload:circuit})


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
