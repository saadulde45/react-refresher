import { combineReducers } from 'redux';
import UserReducer from './reducer-users'

const rootReducer = combineReducers({
    users: UserReducer
});
export default rootReducer;