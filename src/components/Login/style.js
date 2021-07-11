import styled from "styled-components";
import assets from "../../assets";
import colorTheme from "../../colorTheme";


export const LoginPage = styled.div`
    position: absolute;
    height: 100%;
    min-height: 679px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;  

   
`;

export const Background = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background: transparent url(${assets.login_background}) no-repeat center center;
    background-size: cover;
    z-index: -50;
`;

export const LoginWindow = styled.main`
    flex: 0 0 580px;
    width: 500px;
    height: 580px;
    background: white;
    box-shadow: 0px 3px 5px rgb(0,0,0,0.4);
    border-radius: 10px;
    max-width: 100vw;    
    padding: 40px 80px 80px 80px;

    h1 {
        color: #5F4687;
        text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.35); 
        font-weight: bold;
        font-size: 48px;
        display: block;
        text-align: center;        
    }
`;

export const ProfileIcon = styled.div`
    width: 135px;
    height: 135px;
    background: transparent url(${assets.profile_icon}) no-repeat center center;
    background-size: contain;
    margin: 0 auto;
`;


