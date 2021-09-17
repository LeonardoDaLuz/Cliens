import React from "react";
import { HeaderContainer, LogoContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import SearchInput from "./SearchInput";
import Menu from './Menu';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useHistory, useLocation } from "react-router";
import { ReactComponent as CliensLogo } from './../../assets/svg/cliens_icon.svg';
import { ReactComponent as CliensLogo2 } from './../../assets/svg/cliens_icon_3.svg';
import PubSub from 'pubsub-js'

export default function Header() {

    const userstate = useSelector((rootState: RootState) => rootState.user);
    const history = useHistory();
    const location = useLocation();

    if (userstate.loginStatus !== "LOGGED") {
        history.push('/login');
    }

    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to={'/'} onClick={() => PubSub.publish('clear_search_input')}>

                    <CliensLogo className='onlyDesktop' width='120px' height='42px' />
                    <CliensLogo2 className='onlyMobile' width='42px' height='42px' />
                </Link>
            </LogoContainer>
            <SearchInput />
            <Menu />
        </HeaderContainer>

    );
}

