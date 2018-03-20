import { combineReducers } from 'redux';
import CandidatesReducer from './users-reducer'

const rootReducer = combineReducers({
    candidates: CandidatesReducer
});
export default rootReducer;