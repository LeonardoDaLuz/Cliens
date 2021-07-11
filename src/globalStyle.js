import styled , { createGlobalStyle } from 'styled-components'
import colorTheme from './colorTheme';

export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

    body {
        background-color: ${colorTheme.darkPrimary};
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: left;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    ul {
        list-style-type: none;
        margin: 0px;
    }

    img {
        vertical-align: middle;
        border-style: none;
    }

    input, button, select, optgroup, textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
    }

    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
    }

    .h1, h1 {
        font-size: 2.5rem;
    }

    .h2, h2 {
        font-size: 2rem;
    }

    .h3, h3 {
        font-size: calc(1.3rem + .6vw);
    }
    .h4, h4 {
        font-size: 1.5rem;
    }

    .h5, h5 {
        font-size: 1.25rem;
    }

    .h6, h6 {
        font-size: 1rem;
    }


    a {
        color: rgb(64, 64, 64);
        text-decoration: none;


    }

    a:hover {
        text-decoration: underline;
    }

    button {
        cursor: pointer!important;
    }
`;

export const Icon = styled.div`
    flex: 0 0 auto;
    width: ${({size})=>size};
    height: ${({size})=>size};
    background: transparent url(${({src})=>src}) no-repeat center center; 
    background-size: 70%;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.4));
    display: inline-block;
    vertical-align: middle;
`;

export const Button = styled.button`
    background-color: ${colorTheme.subtlePrimary};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0px 15px 0px 15px;
`;
