
import React from "react";
import { LoginPage, Background, LoginWindow, ProfileIcon } from "./style";
import Input from "./Input";
import assets from "../../assets";
import { Icon, Button } from "../../globalStyle";

export default function Login() {
    return (
        <LoginPage>
            <Background />
            <LoginWindow>
                <ProfileIcon />
                <h1>Login</h1>
                <form>
                    <Input type='text' name='login' id='login' placeholder='example@gmail.com' value='' label='E-mail' icon={assets.email_icon} />
                    <Input type='password' name='login' id='login' placeholder='Pelo menos 8 caracteres' value='' label='E-mail' icon={assets.key_icon} />
                    <Button style={{ width: '100%', marginTop: '40px' }}>
                        <Icon src={assets.login_icon} width='32px' height='32px'/>
                        Login</Button>
                </form>
            </LoginWindow>
        </LoginPage>
    );
}