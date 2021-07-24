import styled, { createGlobalStyle, keyframes } from 'styled-components'
import colorTheme from './colorTheme';
import { Link } from 'react-router-dom';
import assets from './assets';

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
        overflow-x: hidden;
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

interface IconProps {
    width: string;
    height: string;
    src: string;
    shadow?: boolean;
}
export const Icon = styled.div<IconProps>`
    flex: 0 0 auto;
    width: ${(p: IconProps) => p.width};
    height: ${(p: IconProps) => p.height};
    background: transparent url(${({ src = '' }) => src}) no-repeat center center; 
    background-size: contain;
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
    margin-left: 7px;
    ${(p: IconProps) => (p.shadow ? ' filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.9))' : '')}
    
`;

export const Button = styled.button`
    background-color: ${colorTheme.subtlePrimary};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0px 15px 0px 15px;
    font-weight: 600;    
    text-align: center;
    box-shadow: 0px 5px 0px  ${colorTheme.subtlePrimary.darken(0.3)}, 0px 5px 5px rgba(0,0,0,0.3);
    transform: translateY(-3px);

    &:hover {
        background-color: ${colorTheme.subtlePrimary.lighten(0.05)};
    }

    &:active {
        transform: translateY(0px);
        box-shadow: 0px 2px 0px  ${colorTheme.subtlePrimary.darken(0.3)},
        0px 5px 5px  rgba(0,0,0,0.3)        ;

    }


`;

interface LabeledLinkProps {
    icon: string;
    iconSize: number;
}

export const LabeledLink = styled(Link)<LabeledLinkProps>`
    background: transparent url(${(p: LabeledLinkProps) => (p.icon)}) no-repeat left center;
    background-size: ${(p: LabeledLinkProps) => (p.iconSize ? p.iconSize : 'contain')};
    padding-left: ${(p: LabeledLinkProps ) => (p.iconSize ? (p.iconSize + 10) + 'px' : '30px')}; 
    margin-left: 0px;
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;


export const LoaderWheel = styled.div`
    display: inline-block;
    vertical-align: middle;
    width: 45px;
    height: 45px;
    background: transparent url(${assets.update_icon}) no-repeat center center;
    background-size: contain;
    animation: ${spin} 0.5s linear infinite;
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;
