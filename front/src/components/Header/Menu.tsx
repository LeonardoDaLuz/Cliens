import React from "react";
import { MenuContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";
import { ReactComponent as SandwichIcon } from '../../assets/svg/sandwich_icon.svg';


function Menu() {

    const dispatch = useDispatch();

    return (
        <MenuContainer>
            <Link to='/add' className='onlyDesktop' style={{ zIndex: 2 }}>
                <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                Adicionar
            </Link>
            <Link to='/customers'  className='onlyDesktop' style={{ zIndex: 1 }}>
                <Icon src={assets.listagem_icon} width='20px' height='20px' />
                listagem
            </Link>
            <a href='#' className='onlyDesktop' onClick={() => dispatch(logout())} style={{ zIndex: 0 }}>
                <Icon src={assets.login_icon} width='20px' height='20px' />
                Sair
            </a>
            <button className='onlyMobile'>
                <SandwichIcon width='42px' height='42px' />
            </button>
        </MenuContainer>
    );
}

export default Menu;
