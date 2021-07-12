import { combineReducers } from 'redux';
import user from './user.reducer';
import clients from './clients.reducer.js';

export default combineReducers({
    user,
    clients
})