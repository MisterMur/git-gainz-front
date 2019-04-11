import {ADD_NEW_WORKOUT,FETCH_SCHEDULES_SUCCESS,SET_CURRENT_WORKOUT,SET_CURRENT_SCHEDULE,FETCH_SCHEDULES_BEGIN,FETCH_SCHEDULES_FAILURE,ADD_NEW_SCHEDULE,SET_WORKOUTS,FETCH_EXERCISES_BEGIN,FETCH_EXERCISES_SUCCESS,FETCH_EXERCISES_FAILURE,FETCH_WORKOUTS_SUCCESS,FETCH_WORKOUTS_BEGIN,FETCH_WORKOUTS_FAILURE,FETCH_SCHEDULES_WORKOUTS} from '../constants/types.js'

const apiUrl=`http://localhost:3000/api/v1/`


// import store from '../store.js'

const initialState={
  workouts:[],
  schedules:[],
  loading:false,
  error:null,
  currentSchedule:null,
  currentWorkout:null

}

function reducer(state=initialState,action){
  console.log('%c reducer:', 'color: orange', action);
  switch(action.type){
    case FETCH_SCHEDULES_BEGIN:
      console.log('fetch begin')
      return {...state,
        loading:true,
        error:null
      }
    case FETCH_SCHEDULES_SUCCESS:
      console.log('fetch success')
      return {
        ...state,
        loading:false,
        schedules:action.payload.schedules
      }
    case FETCH_SCHEDULES_FAILURE:
      console.log('fetch failure')
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        schedules:[]
      }
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
    case FETCH_SCHEDULES_WORKOUTS:
      console.error('reducer current schedule',action.payload.currentSchedule)
      return {
        ...state,
        currentSchedule:action.payload.currentSchedule
      }
    case FETCH_WORKOUTS_FAILURE:
      // console.log('fetch failure')
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        workouts:[]
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
        exercises:action.payload.exercises
      }
    case FETCH_EXERCISES_FAILURE:
      return {
        ...state,
        loading:false,
        error:action.payload.error,
        exercises:[]
      }
    case ADD_NEW_SCHEDULE:
      return {
        ...state,schedules:[...state.schedules,action.payload]
      }
    case ADD_NEW_WORKOUT:
      return{
        ...state,workouts:[...state.workouts,action.payload]
      }
    case SET_CURRENT_SCHEDULE:
      console.log('reducer in set current schedule')
      return {
        ...state,currentSchedule:action.payload
      }
    case SET_WORKOUTS:
      return{
        ...state,workouts:[...state.workouts,action.payload]
      }
    case SET_CURRENT_WORKOUT:
    console.log('reducer in set current workout')

      return{
        ...state,currentWorkout:action.payload
      }

    default:
      console.log('no action type found')
      return state;
  }
}


export function setWorkouts(workouts){
  console.log('in setworkouts',workouts)
  return{
    type:SET_WORKOUTS,
    payload:workouts
  }
}
export function setCurrentWorkout(workout){
  console.log('in set current workout',workout)
  return {
    type: SET_CURRENT_WORKOUT,
    payload:workout
  }
}
export function setCurrentSchedule(schedule){
  // console.log('in setcurrent schedule',schedule)
  return {
      type: SET_CURRENT_SCHEDULE,
      payload:schedule
    }

}

export function addWorkout(workout){
  return {
    type:ADD_NEW_WORKOUT,
    payload:{workout}
  }
}
export function fetchSchedules(){
  const schedulesUrl='http://localhost:3000/api/v1/schedules'
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(schedulesUrl)
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
      return res.json()
    })
    .then(schedules=>{
      // console.log('schedules *************',schedules)
      dispatch(fetchSchedulesSuccess(schedules))
      return schedules
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function fetchWorkouts(){
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(apiUrl+'workouts')
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
      return res.json()
    })
    .then(workouts=>{
      console.warn('fetch workouts',workouts)
      // console.log('schedules *************',schedules)
      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function fetchSchedulesWorkouts(schedule){
  return dispatch=>{
    // dispatch(fetchSchedulesBegin())
    return fetch(apiUrl+`schedules/${schedule.id}`)
    .then(handleErrors)
    .then(res=>{
      // console.log('res',res)
      return res.json()
    })
    .then(workouts=>{
      console.warn('fetch schedules workouts',workouts)
      // console.log('schedules *************',schedules)
      dispatch(fetchWorkoutsSuccess(workouts))
      return workouts
    })
    .catch(error=> dispatch(fetchSchedulesFailure(error)))
  }
}
export function fetchExercises(){
  const exercisesUrl = 'http://localhost:3000/api/v1/exercises'
  return dispatch=>{
    return fetch(exercisesUrl)
      .then(handleErrors)
      .then(res=>{
        return res.json()
      })
      .then(exercises=>{
        dispatch(fetchExercisesSuccess(exercises))
        return exercises
      })
      .catch(error=> dispatch(fetchExercisesFailure(error)))
  }
}
export const fetchExercisesBegin=()=>({
  type:FETCH_EXERCISES_BEGIN
})
export const fetchExercisesSuccess=(exercises)=>{
  return {
    type:FETCH_EXERCISES_SUCCESS,
    payload:{exercises}
  }
}
export const fetchExercisesFailure=(error)=>({
  type:FETCH_SCHEDULES_FAILURE,
  payload:{error}
})
export function postNewSchedule(schedule){
  const scheduleUrl='http://localhost:3000/api/v1/schedules'
  // console.log('in handle add schedule',e)
  return dispatch=>{
    return fetch(scheduleUrl,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
        schedule
      })
    })
    .then(handleErrors)
  }
}
export function postNewWorkout(workout,currentSchedule){
  // addWorkout(workout)
  // console.log('in handle add schedule',e)
  // currentSchedule.workouts=[...currentSchedule.workouts,workout]
  let schedule = {
    ...currentSchedule  }
  console.log('***********************schedule',schedule)
  return dispatch=>{
    return fetch(apiUrl+'workouts',{
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

      console.log('res workout id',workout)
      // console.log("%c res",  "color: blue",res)
      return fetch( apiUrl+'workout_schedules',{
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
    // .then(handleErrors)
  }
}

export function postNewExercise(exercise,currentWorkout){
  // addWorkout(workout)
  console.log('***********************exercise',exercise)
  return dispatch=>{
    return fetch(apiUrl+'exercises',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accepts':'application/json'
      },
      body:JSON.stringify({
          exercise
        }
      )
    })
    .then(res=>{return res.json() })
    .then(exer=>{

      console.log('res exercise id',exer)
      return fetch( apiUrl+'workout_exercises',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accepts':'application/json'
        },
        body:JSON.stringify({
          workout_id:currentWorkout.id,
          exercise_id:exer.id
        })
      }).then(handleErrors)

  })
    .then(handleErrors)
  }
}
export const fetchWorkoutsBegin=()=>({
  type:FETCH_WORKOUTS_BEGIN
})
export const fetchWorkoutsSuccess=(workouts)=>{
  // console.log('fetch success: ',schedules)
  return {

    type:FETCH_WORKOUTS_SUCCESS,
    payload: workouts
  }
}
export const fetchWorkoutsFailure=(error)=>({
  type:FETCH_WORKOUTS_FAILURE,
  payload:{error}
})
export const fetchSchedulesWorkoutsSuccess=(currentSchedule)=>({
  type:FETCH_SCHEDULES_WORKOUTS,
  payload:{currentSchedule}
})

export const fetchSchedulesBegin=()=>({
  type:FETCH_SCHEDULES_BEGIN
})
export const fetchSchedulesSuccess=(schedules)=>{
  // console.log('fetch success: ',schedules)
  return {

    type:FETCH_SCHEDULES_SUCCESS,
    payload: {schedules}
  }
}
export const fetchSchedulesFailure=(error)=>({
  type:FETCH_SCHEDULES_FAILURE,
  payload:{error}
})

export const addNewSchedule=(schedule)=>({
  type:ADD_NEW_SCHEDULE,
  payload:{schedule}
})

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
export default reducer
