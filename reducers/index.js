import { combineReducers } from 'redux';
import userReducer from './userReducer';
import scheduleReducer from './scheduleReducer';
import workoutReducer from './workoutReducer';
import authReducer from './authReducer'
import navReducer from './navReducer'

export default combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  workout: workoutReducer,
  auth:authReducer,
})
