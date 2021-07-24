
import React from "react";
import { LoginPage, Background, LoginWindow, ProfileIcon, LoginWheel, LoginError, LoginButton } from "./style";
import Input from "./Input";
import assets from "../../assets";
import { Icon, Button, LoaderWheel } from "../../globalStyle";
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { bindActionCreators } from "redux";
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { loginAction } from '../../store/actions/user.action';
import { UserState } from "../../store/types/user.types";
import styled from "styled-components";
import { useHistory } from "react-router";

type props = {
    loginAction: any,
    user: UserState
}

function Login({ loginAction, user }: props) {

    const validate = (values: any) => {
        const errors: any = {};
        if (!values.login) {
            errors.login = 'Requerido';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)
        ) {
            errors.login = 'Email inválido';
        }
        if (!values.password) {
            //errors.password = 'Required';
        } else if (
            values.password.length < 6
        ) {
            errors.password = 'Deve ter pelo menos 8 caracteres';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            loginAction(values.login, values.password);
        },
    });

    const history = useHistory();

    if(user.loginStatus === 'LOGGED') {
        history.push('/listagem');
    }



    return (
        <LoginPage>
            <Background />
            <LoginWindow>
                <ProfileIcon />
                <h1>Login</h1>
                {(user.loginStatus !== 'LOGGING') &&
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            type='text'
                            name='login'
                            formik={formik}
                            label='E-mail'
                            icon={assets.email_icon}
                            placeholder='exemplo@gmail.com'
                        />
                        <Input
                            type='password'
                            name='password'
                            formik={formik}
                            label='Senha'
                            icon={assets.key_icon}
                            placeholder='********'
                        />
                        <LoginError>
                            {user.loginStatus === "INCORRECT_LOGIN_OR_PASSWORD" && <span>Login ou password incorretos</span>
                            }
                            {user.loginStatus === "LOGIN_FAILURE" && <span>Houve um erro ao logar</span>
                            }

                        </LoginError>
                        <LoginButton type='submit' style={{ width: '100%' }}>
                            <Icon src={assets.login_icon} width='32px' height='32px' />
                            Login
                        </LoginButton>

                    </form>
                }
                {user.loginStatus === 'LOGGING' &&
                    <>
                        <LoginWheel></LoginWheel>
                    </>
                }
            </LoginWindow>
        </LoginPage >
    );
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ loginAction }, dispatch);

const mapStateToProps = (store: ApplicationState) => ({
    user: store.user,
})

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Login);
