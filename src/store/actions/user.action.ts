import actionTypes from '../actionTypes'
import { Dispatch, } from 'redux';
import { ApplicationState } from '..';
import { UserAction } from '../types/user.types';
import { Action } from 'redux';
import config from '../../config';


export const loginAction = (login: string, password: string) => {
    return async (dispatch: Dispatch, getState: () => ApplicationState) => {

        dispatch<Partial<UserAction> & Action>({
            type: actionTypes.LOGIN_START,
            login,
            password
        });

        interface LoginResponseType {
            email: string,
            token?: string,
        }

        await fetch(config.apiUrl + '/usuarios?email=' + login + '&password=' + password + '')
            .then(body => body.json())
            .then((data: LoginResponseType) => {

                
                if (Array.isArray(data) && data.length === 1) {
                    dispatch<UserAction>({
                        type: actionTypes.LOGIN_SUCCESS,
                        login,
                        password,
                        token: data.token,
                    })
                } else {
                    dispatch<Partial<UserAction> & Action>({ type: actionTypes.INCORRECT_LOGIN_OR_PASSWORD })
                }
            })
            .catch(error => {
                dispatch<Partial<UserAction> & Action>({ type: actionTypes.LOGIN_FAILURE, error })
            })

    }
}
