import {createStore, combineReducers} from 'redux'
import musicReducer from './musicReducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    music: musicReducer,
    user: userReducer
})


export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())