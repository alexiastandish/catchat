import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  user: userReducer,
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

export default store
