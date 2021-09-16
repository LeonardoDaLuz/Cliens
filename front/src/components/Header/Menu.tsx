import React, { useEffect, useRef } from "react";
import { MenuContainer, MenuLink } from "./style";
import { Icon } from "../../globalStyle";
import assets from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user";
import { ReactComponent as SandwichIcon } from '../../assets/svg/sandwich_icon.svg';

function hideDropdown(e: MouseEvent) {

}

function Menu() {

    const dispatch = useDispatch()

    const navRef = useRef<HTMLElement>(null)


    function toogleDropdown(e: any) {

        if (navRef.current) {

            if (navRef.current?.classList.contains('show')) {
               navRef.current?.classList.remove('show');
            } else {
                navRef.current?.classList.add('show');               
                setTimeout(() =>  document.body.addEventListener('click', ()=> navRef.current?.classList.remove('show'), { once: true }), 300)    
            }
        }
    }

    return (
        <MenuContainer>

            <button className='' onClick={toogleDropdown}>
                <SandwichIcon className='sandwichIcon' width='42px' height='42px' />

            </button>
            <nav ref={navRef}>

                <MenuLink to='/add' className='' style={{ zIndex: 2 }}>
                    <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                    Adicionar
                </MenuLink>
                <MenuLink to='/customers' className='' style={{ zIndex: 1 }}>
                    <Icon src={assets.listagem_icon} width='20px' height='20px' />
                    listagem
                </MenuLink>
                <MenuLink to='#' className='' onClick={() => dispatch(logout())} style={{ zIndex: 0 }}>
                    <Icon src={assets.login_icon} width='20px' height='20px' />
                    Sair
                </MenuLink>
            </nav>
        </MenuContainer>
    );
}

export default Menu;
