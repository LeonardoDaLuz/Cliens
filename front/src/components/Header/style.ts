import styled, { css } from "styled-components";
import colorTheme from "../../colorTheme";
import assets from "../../assets";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
    display: flex;
 //   position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 30;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.5);
`;


export const SkewBlock = css`
    position: relative;
   // padding-right: 20px;
   // padding-left: 20px;
    &:before {
        content: "";
        position: absolute;
        display: block;
        left: -10px;
        right: -10px;
        top: 0px;
        bottom: 0px;
        z-index:-1;
        transform: skewX(-35deg);
        height: 100%;

        background-color: white;
        box-shadow: 2px 0px 3px rgba(0,0,0,0.5);
        padding: 0px;
    }

`;

export const LogoContainer = styled.div`

    ${SkewBlock}

    padding: 3px 20px 0px 40px;
    margin-left: -20px;
    flex-shrink: 0;

    z-index: 5;

    a {
        display: block;
        margin-bottom: -5px;
    }
`;

export const SearchContainer = styled.div`

    ${SkewBlock}
    flex: 1 1 400px;
    //background-color: ${colorTheme.secondary};
    padding: 0px 5px 0px 25px;
    z-index: 3;

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

            transition: transform 0.3s;

            &:hover {
                transform: scale(1.3,1.3)
            }

            &:active {

                transition: transform 0s;
                transform: scale(1.1,1.1)
            }
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

export const MenuLink = styled(Link)`

        padding: 10px;

        @media(min-width: 992px) {
            ${SkewBlock}      
            padding: 0px 25px 0px 25px;
        }
        color: white;
        font-weight: bold;
        text-decoration: none;

        display: flex;
        align-items: center;


        &:hover {
            text-decoration: none;

            &:before {
                background-color: ${colorTheme.primary.lighten(0.3)};
            }

            @media(max-width: 992px) {
                background-color: ${colorTheme.primary.lighten(0.3)};
                
                &:first-child {
                    border-radius: 10px 10px 0px 0px;
                }

                &:last-child {
                    border-radius: 0px 0px 10px 10px;
                }
            }
        }


        &:before {
            left: -5px;
            right: -5px;
            background-color: ${colorTheme.primary};

        }
    

`;
export const MenuContainer = styled.div`

    ${SkewBlock}
    padding-right: 25px;
    margin-right: -25px;
 
    &:before {
        background-color: ${colorTheme.primary};
    }

    nav {
        padding: 0px;
        display: flex;
        height: 100%;
    }

    a {

   
    }

    a:hover {

    }


    button {

        margin: 0px 5px 0px 25px;
        display: none;
        color: white;
        background-color: transparent;
        outline: none;
        border: none;

   
    }

    @media(max-width: 992px) {
        button {
            display: block;

        }

        nav {

            &:before {
                z-index: 26;
                content: '';
                display: block;
                position: absolute;
                width: 0px;
                border-bottom: 10px solid ${colorTheme.primary.lighten(0.2)};
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                top: -10px;
                right: 20px; 
            }

            z-index: 25;
            box-shadow: 2px 3px 3px rgba(0,0,0,0.4);
            position: absolute;
            right: 30px;
            width: 140px;
            display: none;
            height: auto;
            background-color: ${colorTheme.primary.lighten(0.2)};
          
            border-radius: 10px;

            a {
                display: block;
            }


        }

        nav.show {
            display: block;
        }
    }

    

`;
