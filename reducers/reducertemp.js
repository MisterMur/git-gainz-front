import {ADD_NEW_WORKOUT,FETCH_SCHEDULES_SUCCESS,SET_CURRENT_WORKOUT,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,ADD_NEW_SCHEDULE,SET_WORKOUTS,FETCH_EXERCISES_BEGIN,FETCH_EXERCISES_SUCCESS,FETCH_EXERCISES_FAILURE,FETCH_WORKOUTS_SUCCESS,FETCH_WORKOUTS_BEGIN,FETCH_WORKOUTS_FAILURE,FETCH_SCHEDULES_WORKOUTS,FETCH_CIRCUITS_SUCCESS,FETCH_CIRCUITS_FAILURE,FETCH_USER_WORKOUTS_BEGIN,FETCH_USER_WORKOUTS_SUCCESS,FETCH_USER_WORKOUTS_FAILURE} from '../constants/types.js'
import {API_URL}from '../constants/types.js'
// const apiUrl=`http://192.168.2.243:3000/api/v1/`
// const apiUrl = `https://gitgainz.herokuapp.com/api/v1/`


// import store from '../store.js'

const initialState={
  workouts:[],
  schedules:[],
  loading:false,
  error:null,
  currentSchedule:null,
  currentWorkout:null,
  currentUser:{id:29,name:'Brad',password:'1234'}
}


export function fetchCircuits(exercise_id){
  return dispatch=>{
    return fetch(API_URL+`exercises/${exercise_id}`)
    .then(handleErrors)
    .then(res=>res.json())
    .then(circuits=>{
      dispatch(fetchCircuitsSuccess(circuits))
      return circuits
    })
    .catch(error=>
      dispatch(fetchCircuitsFailure(error))
    )
  }

}

export function fetchUserWorkouts(user){
  return dispatch=>{
    return fetch(API_URL+`users/${user.id}`)
    .then(handleErrors)
    .then(res=>res.json())
    .then(workouts=>{
      dispatch(fetchUserWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=>
      dispatch(fetchUserWorkoutsFailure(error))
    )
  }
}


export function postNewWorkout(workout,currentSchedule){
  // addWorkout(workout)
  // currentSchedule.workouts=[...currentSchedule.workouts,workout]
  let schedule = {
    ...currentSchedule  }
  return dispatch=>{
    return fetch(API_URL+'workouts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
          workout
        }
      )
    })
    .then(res=>res.json())
    .then(workout=>{

      return fetch( API_URL+'workout_schedules',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json'
        },
        body:JSON.stringify({
          schedule_id:currentSchedule.id,
          workout_id:workout.id
        })
      }).then(handleErrors)
      .then(function(){
        dispatch(fetchSchedulesWorkouts(currentSchedule))
      })

  })
  }
}
export function postNewCompleteWorkout(currentUser,workout){

  return dispatch=>{

    return fetch( API_URL+'user_workouts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
        workout_id:workout.id,
        user_id:currentUser.id
      })
    }).then(handleErrors)
  .then(function(){
    dispatch(fetchUserWorkouts(currentUser))
  })
  }
}


export function postNewCircuit(circuit){
  return (dispatch)=>{
    // dispatch(fetchCircuits(circuit.exercise_id))
    fetch(API_URL+'circuits',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify(
        circuit
      )
    })//.then(res=> res.json())


    .then(function(){dispatch(fetchCircuits(circuit.exercise_id))})
  }
}
export const fetchUserWorkoutsBegin=()=>({
  type:FETCH_USER_WORKOUTS_BEGIN
})
export const fetchUserWorkoutsSuccess=(workouts)=>{
  return {

    type:FETCH_USER_WORKOUTS_SUCCESS,
    payload: workouts
  }
}
export const fetchUserWorkoutsFailure=(error)=>({
  type:FETCH_USER_WORKOUTS_FAILURE,
  payload:{error}
})

export const fetchSchedulesWorkoutsSuccess=(currentSchedule)=>({
  type:FETCH_SCHEDULES_WORKOUTS,
  payload:{currentSchedule}
})
export const fetchCircuitsSuccess=(circuits)=>{
  return {
    type:FETCH_CIRCUITS_SUCCESS,
    payload:circuits
  }
}
export const fetchCircuitsFailure=(error)=>({
  type:FETCH_CIRCUITS_FAILURE,
  payload:{error}
})

function handleErrors(response) {
  if (!response.ok) {

    throw Error(response.statusText);
  }
  return response;
}
export default reducer
