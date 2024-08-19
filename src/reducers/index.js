import { combineReducers } from 'redux'


import auth from './auth'
import bugs from './bugsReducer'
 

export default combineReducers({
    auth,
    bugs, 
 
})