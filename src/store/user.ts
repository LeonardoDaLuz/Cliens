/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Action } from "redux";
import { AppDispatch, AppThunk, RootState } from '.';
import config from '../config';

export interface UserState {
    loginStatus: 'NOT_LOGGED' | 'LOGGING' | 'LOGGED' | 'LOGIN_FAILURE' | 'INCORRECT_LOGIN_OR_PASSWORD',
    userLogin: string,
}

export interface UserAction {
    login: string,
    password: string,
    error?: any,
    token?: string,
    fetchUrl?: string,
}

const initialState: UserState = {
    loginStatus: 'NOT_LOGGED',
    userLogin: '',
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
        }
    }
})

export const { loginStart, LoginSucess, incorrectLoginOrPassword, loginFailure } = userSlice.actions

export default userSlice.reducer;

export const loginThunk = (login: string, password: string): AppThunk => {
  
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const fetchUrl = config.apiUrl + '/usuarios?email=' + login + '&password=' + password + '';

        dispatch(loginStart({ login, password }));

        interface LoginResponseType {
            email: string,
            token?: string,
        }

        await fetch(fetchUrl)
            .then(body => body.json())
            .then((data: LoginResponseType) => {

                if (Array.isArray(data) && data.length === 1) {
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