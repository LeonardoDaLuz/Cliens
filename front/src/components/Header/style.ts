import styled from "styled-components";
import colorTheme from "../../colorTheme";
import assets from "../../assets";

export const HeaderContainer = styled.div`
    display: flex;
 //   position: -webkit-sticky; /* Safari */
 // position: sticky;
  top: 0;
  z-index: 30;
`;

export const SkewBlock = styled.div`


`;

export const LogoContainer = styled(SkewBlock)`

   padding: 3px 5px 0px 5px;
    flex-shrink: 0;
    background-color: ${colorTheme.tertiary};
    z-index: 5;

    a {
        display: block;
        margin-bottom: -5px;
    }



`;

export const SearchContainer = styled(SkewBlock)`
    flex: 1 1 400px;
    background-color: ${colorTheme.secondary};

    &:before {
        background-color: ${colorTheme.secondary};

    }

    form {
        display: flex;
        height: 50px;
        z-index: 4;

        button {
            width: 48px;
  
            border: none;
            background: transparent url(${assets.search_icon}) no-repeat center center;
            background-size: 65%;
        }

        input {
            flex: 1 1 40px;
            width: 50px;
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
    }
`;

export const MenuContainer = styled(SkewBlock)`
    flex: 1 1 auto;

    @media(min-width: 600px) {
        /*
    margin-right: -30px;
    padding-right: 30px;
    */
    }
    background-color: ${colorTheme.primary};
    box-shadow: 2px 0px 2px rgba(0,0,0,0.3);
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

    button {
        color: white;
        background-color: transparent;
        outline: none;
        border: none;
    }

    /*
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
    }*/
    
    a:hover:before {
   
        background-color: ${colorTheme.primary.lighten(0.1)};
    }


    

`;
