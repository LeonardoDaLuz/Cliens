import { Action } from "redux";

export interface UserState {
    loginStatus: string
}

export interface UserAction extends Action {
    
}


export type UserRequestResponse = {} | {
    email: string;
}

