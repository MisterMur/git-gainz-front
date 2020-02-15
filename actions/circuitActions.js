//adapter imports
import WorkoutAdapter from '../adapters/workoutAdapter'




export function addCircuit(circuit){
  return dispatch=>{
    return WorkoutAdapter.postCircuit(circuit)
    .then(function(){
      // dispatch(fetchWorkoutsExercises(currentWorkout))
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
