import { HeaderStyles, LogoBlock_, SearchBlock_, MenuBlock_ } from "./style";
import { Icon, LabeledLink } from "../../globalStyle";
import assets from "../../assets";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <HeaderStyles>

            <LogoBlock_>
                <Icon src={assets.cliens_icon} width='120px' height='50px' />
            </LogoBlock_>
            <SearchBlock />
            <MenuBlock>

            </MenuBlock>
        </HeaderStyles>

    );
}


function SearchBlock() {
    return (
        <SearchBlock_>
            <input type='text' value='teste' />
            <button />
        </SearchBlock_>
    );
}

function MenuBlock() {
    return (
        <MenuBlock_>
            <Link to='/adicionar' style={{zIndex: 2}}>
                <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                Adicionar
            </Link>
            <Link to='/adicionar' style={{zIndex: 1}}>
                <Icon src={assets.listagem_icon} width='20px' height='20px' />
                listagem
            </Link>
            <Link to='/adicionar' style={{zIndex: 0}}>
                <Icon src={assets.login_icon} width='20px' height='20px' />
                Sair
            </Link>
        </MenuBlock_>
    );
}
