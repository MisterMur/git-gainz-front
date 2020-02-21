import { combineReducers } from 'redux';
import userReducer from './userReducer';
import scheduleReducer from './scheduleReducer';
import workoutReducer from './workoutReducer';
import authReducer from './authReducer'
import muscleReducer from './muscleReducer'
import completedWorkoutReducer from './completedWorkoutReducer'
import circuitReducer from './circuitReducer'
export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  workout: workoutReducer,
  auth:authReducer,
  history:completedWorkoutReducer,
	muscles:muscleReducer,
	circuits:circuitReducer,
})
