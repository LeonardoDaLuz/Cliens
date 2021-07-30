import React from "react";
import { MenuContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import { Link} from "react-router-dom";

function Menu() {
    return (
        <MenuContainer>
            <Link to='/edit' style={{ zIndex: 2 }}>
                <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                Adicionar
            </Link>
            <Link to='/customers' style={{ zIndex: 1 }}>
                <Icon src={assets.listagem_icon} width='20px' height='20px' />
                listagem
            </Link>
            <Link to='/logout' style={{ zIndex: 0 }}>
                <Icon src={assets.login_icon} width='20px' height='20px' />
                Sair
            </Link>
        </MenuContainer>
    );
}

export default Menu;
