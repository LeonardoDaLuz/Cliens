/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from "redux";
import { AppDispatch, AppThunk, RootState } from '.';
import config from '../config';


export interface UserState {
    loginStatus: 'NOT_LOGGED' | 'LOGGING' | 'LOGGED' | 'LOGIN_FAILURE' | 'INCORRECT_LOGIN_OR_PASSWORD',
    userLogin: string,
    token: string
}

export interface UserAction {
    login: string,
    password: string,
    error?: any,
    token?: string,
    url?: string,
}

const initialState: UserState = {
    loginStatus: localStorage.getItem('login')?'LOGGED': 'NOT_LOGGED',
    userLogin: localStorage.getItem('login'),
    token: localStorage.getItem('token')
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state: UserState, action: PayloadAction<UserAction>) => {
            state.loginStatus = 'LOGGING';
            state.userLogin = '';

        },
        LoginSucess: (state: UserState, action: PayloadAction<UserAction>) => {
            state.loginStatus = 'LOGGED';
            state.userLogin = action.payload.login;
            state.token = action.payload.token;
            localStorage.setItem('login', action.payload.login);
            localStorage.setItem('token', action.payload.token);
        },
        incorrectLoginOrPassword: (state, action: PayloadAction<UserAction>) => {
            state.loginStatus = 'INCORRECT_LOGIN_OR_PASSWORD';
            state.userLogin = '';
        },
        loginFailure: (state, action: PayloadAction<UserAction>) => {
            state.loginStatus = 'LOGIN_FAILURE';
            state.userLogin = '';
        },
        logout: (state, action: PayloadAction<UserAction>) => {
            state.loginStatus = 'NOT_LOGGED';
            state.token = '';
            localStorage.setItem('login', '');
            localStorage.setItem('token', '');
        }
    }
})

export const { loginStart, LoginSucess, incorrectLoginOrPassword, loginFailure, logout } = userSlice.actions

export default userSlice.reducer;

export const loginThunk = (login: string, password: string): AppThunk => {
  
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const fetchUrl = config.apiUrl+'/login';

        dispatch(loginStart({ login, password, url: fetchUrl }));

        interface LoginResponseType {
            auth: boolean,
            token?: string,
        }

        const formData = new FormData();

        formData.append('login', login);
        formData.append('password', password);

        await fetch(fetchUrl, {  method: 'post', body: 'login='+login+'&password='+password+'', headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(body => body.json())
            .then((data: LoginResponseType) => {

                if ('auth' in data && data.auth === true) {
                    dispatch(LoginSucess({ login, password, token: data.token }));

                } else {
                    dispatch(incorrectLoginOrPassword({ login, password }));
                }
            })
            .catch(error => {
                dispatch(loginFailure({ login, password, error }));
            })        
    }
}