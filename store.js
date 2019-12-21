import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'; // trick with imports
import {persistStore, persistReducer} from 'redux-persist'

import {AsyncStorage} from 'react-native'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)

export default { store, persistor}
