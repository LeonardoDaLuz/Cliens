import React from "react";
import { HeaderContainer, LogoContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import SearchInput from "./SearchInput"; 
import Menu from './Menu';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory } from "react-router";

export default function Header() {

    const userstate = useSelector((rootState: RootState) => rootState.user);
    const history = useHistory();

    if (userstate.loginStatus !== "LOGGED") {
        history.push('/login');
    }
    
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

