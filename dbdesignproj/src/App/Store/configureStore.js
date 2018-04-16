import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'
import creditReducer from '../Reducers/creditReducer'
import loginReducer from '../Reducers/loginReducer'
import ordersReducer from '../Reducers/ordersReducer'
import reportsReducer from '../Reducers/reportsReducer'
import searchReducer from '../Reducers/searchReducer'

const enhancer = compose(
    applyMiddleware(thunk, promise, logger)
)

const reducer = combineReducers({
    creditReducer: creditReducer,
    loginReducer: loginReducer,
    ordersReducer: ordersReducer,
    reportsReducer: reportsReducer,
    searchReducer: searchReducer
})

const initialState = {}

const store = createStore(reducer, initialState, enhancer)

export default store
