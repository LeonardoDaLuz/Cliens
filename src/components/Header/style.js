import styled from "styled-components";
import colorTheme from "../../colorTheme";
import assets from "../../assets";

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const SkewBlock = styled.div`
    position: relative;
    padding-right: 20px;
    padding-left: 20px;
    &:before {
        content: "";
        position: absolute;
        display: block;
        left: 0px;
        z-index:-1;
        transform: skewX(-45deg);
        height: 100%;
        width: 100%;
        background-color: white;
        box-shadow: 2px 3px 3px rgba(0,0,0,0.5);
    }

`;

export const LogoContainer = styled(SkewBlock)`
    flex: 0.2 0 200px;
    margin-left: -20px;
    padding-left: 40px;
    z-index: 5;
        &:before {
        background-color: white;

    }
`;

export const SearchContainer = styled(SkewBlock)`
    flex: 1 1 400px;
    display: flex;
    height: 50px;
    z-index: 4;
    &:before {
        background-color: ${colorTheme.secondary};

    }

    button {
        flex: 0 1 60px;
        border: none;
        background: transparent url(${assets.search_icon}) no-repeat center center;
        background-size: 65%;
    }

    input {
        flex: 1 1 40px;
        border: none;
        background-color: ${colorTheme.secondary.darken(0.15)};
        margin: 5px;
        border-radius: 20px;
        padding: 5px 18px 5px 18px;
        font-weight: 600;
        color: white;
        font-size: 17px;
        letter-spacing: 1px;
        outline: none;
    }
`;

export const MenuContainer = styled(SkewBlock)`
    flex: 1 1 400px;
    margin-right: -30px;
    padding-right: 30px;
    padding-left: 0px;
    height: 50px;
    display: flex;

    &:before {
        background-color: ${colorTheme.primary};

    }

    a {
        flex: 1 1 50px;
        position: relative;                
        color: white;
        font-weight: 600;
        letter-spacing: 2px;
        width: 100%;  
        text-decoration: none;
        line-height: 50px;
        text-align: center;
    }

    a:before {
        content: '';
        position: absolute;
        top: 0px;
        display: block;
        width: 100%;
        height: 100%;        
        transform: skewX(-45deg);        
        background-color: ${colorTheme.primary};
        box-shadow: 2px 0px 2px rgba(0,0,0,0.3);
        z-index: -1;
    }
    
    a:hover:before {
   
        background-color: ${colorTheme.primary.lighten(0.1)};
    }


    

`;
