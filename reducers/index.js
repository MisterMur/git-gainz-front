import { combineReducers } from 'redux';
import userReducer from './userReducer';
import scheduleReducer from './scheduleReducer';
import workoutReducer from './workoutReducer';
import authReducer from './authReducer'
import muscleReducer from './muscleReducer'
import completedWorkoutReducer from './completedWorkoutReducer'
export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  workout: workoutReducer,
  auth:authReducer,
  history:completedWorkoutReducer,
	muscles:muscleReducer,
})
