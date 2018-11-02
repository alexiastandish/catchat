import { applyMiddleware, createStore, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import itemReducer from './itemReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  item: itemReducer,
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
)

export default store
