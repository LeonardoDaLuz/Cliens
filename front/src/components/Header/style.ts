import styled from "styled-components";
import colorTheme from "../../colorTheme";
import assets from "../../assets";

export const HeaderContainer = styled.div`
    display: flex;
 //   position: -webkit-sticky; /* Safari */
  position: sticky;
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

    background-color: ${colorTheme.primary};
 
    nav {
        padding: 0px;
        display: flex;
        height: 100%;
    }

    a {
        padding: 10px;
        color: white;
        font-weight: bold;
        text-decoration: none;

        display: flex;
        align-items: center;
   
    }

    a:hover {
        text-decoration: none;
        background-color: ${colorTheme.primary.darken(0.2)}
    }


    button {
        display: none;
        color: white;
        background-color: transparent;
        outline: none;
        border: none;
    }

    @media(max-width: 900px) {
        button {
            display: block;
        }

        nav {
            position: absolute;
            right: 0px;
            display: none;

            background-color: ${colorTheme.primary};

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
