
import { LoginPage, Background, LoginWindow, ProfileIcon  } from "./style";
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
                    <Input type='text' name='login' id='login'  placeholder='example@gmail.com' value='' label='E-mail' icon={assets.email_icon}/>
                    <Input type='text' name='login' id='login'  placeholder='********' value='' label='E-mail' icon={assets.key_icon}/>
                    <Button style={{width: '100%', marginTop: '30px'}}><Icon src={assets.login_icon} size='48px' />Login</Button>
                </form>
            </LoginWindow>
        </LoginPage>
    );
}