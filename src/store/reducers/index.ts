import { combineReducers } from 'redux';
import user from './user.reducer';
import clients from './clients.reducer';

export default combineReducers({
    user,
    clients
})