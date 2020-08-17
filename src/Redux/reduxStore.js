import {createStore} from 'redux'
import musicReducer from './musicReducer'

export default createStore(musicReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())