import styled from "styled-components";
import { Link } from "react-router-dom";
import assets from "../../assets";
import colorTheme from "../../colorTheme";

export const Header = styled.header`
    height: 50px;
    background-color: white;
    padding: 10px;
    border-bottom: 4px solid ${colorTheme.tertiary.hex()};

`;

export const HeaderLogo = styled(Link)`
    background: transparent url(${assets.header_logo}) no-repeat center center;
    background-size: contain;
    width: 150px;
    height: 100%;
    display: block;
`;