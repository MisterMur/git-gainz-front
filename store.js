import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'; // trick with imports

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
export default store
