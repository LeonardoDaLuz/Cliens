import React from "react";
import { MenuContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import { Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";

function Menu() {

    const dispatch = useDispatch();

    return (
        <MenuContainer>
            <Link to='/add' style={{ zIndex: 2 }}>
                <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                Adicionar
            </Link>
            <Link to='/customers' style={{ zIndex: 1 }}>
                <Icon src={assets.listagem_icon} width='20px' height='20px' />
                listagem
            </Link>
            <a href='#' onClick={() => dispatch(logout())} style={{ zIndex: 0 }}>
                <Icon src={assets.login_icon} width='20px' height='20px' />
                Sair
            </a>
        </MenuContainer>
    );
}

export default Menu;
