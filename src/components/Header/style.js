import styled from "styled-components";
import colorTheme from "../../colorTheme";

export const HeaderStyles = styled.div`
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

export const LogoBlock = styled(SkewBlock)`
    flex: 0 1 400px;
      margin-left: -1000px; 
     padding-left: 1000px; 
    z-index: 1;
        &:before {
        background-color: white;

    }
`;

export const SearchBlock = styled(SkewBlock)`
    flex: 0 1 400px;
    height: 50px;
        &:before {
        background-color: ${colorTheme.secondary};

    }
`;

export const MenuBlock = styled(SkewBlock)`
    flex: 0 1 400px;
    margin-right: -1000px; 
    padding-right: 1000px; 

    height: 50px;
        &:before {
        background-color: ${colorTheme.primary};

    }
`;
