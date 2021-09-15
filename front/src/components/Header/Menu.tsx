import React, { useRef } from "react";
import { MenuContainer } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";
import { ReactComponent as SandwichIcon } from '../../assets/svg/sandwich_icon.svg';


function Menu() {

    const dispatch = useDispatch();

    const navRef = useRef<HTMLElement>(null);

    function toogleDropdown() {
        navRef.current?.classList.toggle('show');

    }
    
    return (
        <MenuContainer>

            <button className='' onClick={toogleDropdown}>
                <SandwichIcon className='sandwichIcon' width='42px' height='42px' />
                
            </button>
            <nav ref={navRef}>
                    
                    <Link to='/add' className='' style={{ zIndex: 2 }}>
                        <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                        Adicionar
                    </Link>
                    <Link to='/customers' className='' style={{ zIndex: 1 }}>
                        <Icon src={assets.listagem_icon} width='20px' height='20px' />
                        listagem
                    </Link>
                    <a href='#' className='' onClick={() => dispatch(logout())} style={{ zIndex: 0 }}>
                        <Icon src={assets.login_icon} width='20px' height='20px' />
                        Sair
                    </a>
                </nav>
        </MenuContainer>
    );
}

export default Menu;
