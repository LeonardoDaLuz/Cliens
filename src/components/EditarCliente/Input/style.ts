import styled from "styled-components";
import assets from "../../../assets";
import colorTheme from "../../../colorTheme";


export const InputStyles = styled.div`
    flex: 1 1 369px;
  
    padding: 10px;

    label {
            display: block;
            font-weight: bold;
            color: ${colorTheme.darkPrimary};
            line-height: 48px;
            text-shadow: 0px 3px 3px rgba(0,0,0,0.3);
    }
        
    input {
        width: 100%;
        border: none;
        outline: none;
        padding: 0px;
        font-weight: bold;
        color: ${colorTheme.placeholderText};
        background-color: transparent;
        font-smooth: 2em;
        /* background: ${colorTheme.subtleSecondary} url(${assets.email_icon}) no-repeat 3% 50%; */
        background-size: 34px;

        &::placeholder{
            color: ${colorTheme.placeholderText};
            font-weight: bold;
            font-smooth: 2em;
            
        }
    }
`;

export const InputBackground = styled.div`
    background-color: ${colorTheme.subtleSecondary};
    border-radius: 5px;
    display: flex;
    height: 50px;
    align-items: center;
`;

interface InputIconProps {
    icon: string;
}

export const InputIcon = styled.div<InputIconProps>`
    flex: 0 0 auto;
    width: 35px;
    height: 35px;
    margin: 0px 10px 0px 10px;
    background: transparent url(${(p) => p.icon}) no-repeat center center; 
    background-size: contain;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.4));   

`;



