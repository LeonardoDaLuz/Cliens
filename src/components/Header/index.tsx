import React from "react";
import { HeaderContainer, LogoContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import SearchInput from "./SearchInput"; 
import Menu from './Menu';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to='/customers'>
                <Icon src={assets.cliens_icon} width='120px'  height='50px' />
                </Link>
            </LogoContainer>
            <SearchInput />
            <Menu />
        </HeaderContainer>

    );
}

