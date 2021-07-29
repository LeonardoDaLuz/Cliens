
import React from "react";
import { LoginPage, Background, LoginWindow, ProfileIcon, LoginWheel, LoginError, LoginButton } from "./style";
import Input from "./Input";
import assets from "../../assets";
import { Icon, Button, LoaderWheel } from "../../globalStyle";
import { useFormik } from 'formik';
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../store';
import { loginThunk, loginFailure } from '../../store/user';

function Login() {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    const validate = (values: { login: string, password: string }) => {

        const errors: Partial<typeof values> = {};

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
        onSubmit: async (values) => {
            dispatch(loginThunk(values.login, values.password));
        },
    });

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

export default Login;
