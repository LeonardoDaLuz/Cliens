import actionTypes from '../actionTypes'
import { UserState, UserAction } from '../types/user.types';
import produce from 'immer';

const initialState: UserState = {
    loginStatus: 'NOT_LOGGED',
    userLogin: '',


}

const user = produce((draft, action: UserAction) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            draft.loginStatus = 'LOGGING';
            draft.userLogin = '';
            break;
        case actionTypes.LOGIN_SUCCESS:
            draft.loginStatus = 'LOGGED';
            draft.userLogin = action.login;
            localStorage.setItem('login', action.login);
            localStorage.setItem('token', action.token);
            break;
        case actionTypes.INCORRECT_LOGIN_OR_PASSWORD:
            draft.loginStatus = 'INCORRECT_LOGIN_OR_PASSWORD';
            draft.userLogin = '';
            break;
        case actionTypes.LOGIN_FAILURE:
            draft.loginStatus = 'LOGIN_FAILURE';
            draft.userLogin = '';
            break;
    }


}, initialState);


export default user;