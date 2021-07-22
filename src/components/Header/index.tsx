import React from "react";
import { HeaderContainer, LogoContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import SearchInput from "./SearchInput"; 
import Menu from './Menu';

export default function Header() {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Icon src={assets.cliens_icon} width='120px'  height='50px' />
            </LogoContainer>
            <SearchInput />
            <Menu />
        </HeaderContainer>

    );
}

