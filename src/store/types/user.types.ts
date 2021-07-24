import { Action } from "redux";

export interface UserState {
    loginStatus: 'NOT_LOGGED' | 'LOGGING' | 'LOGGED' | 'LOGIN_FAILURE' | 'INCORRECT_LOGIN_OR_PASSWORD',
    userLogin: string,
}

export interface UserAction extends Action {
    login: string,
    password: string,
    error?: any,
    token?: string
}

export type UserRequestResponse = {} | {
    email: string;
}

