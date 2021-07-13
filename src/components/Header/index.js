import { HeaderStyles, LogoBlock_, SearchBlock_, MenuBlock_ } from "./style";
import { Icon, LabeledLink } from "../../globalStyle";
import assets from "../../assets";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { resetSearchCounter } from "../../store/actions/clients.action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
};

const mapDispatchToProps = dispatch =>
    bindActionCreators({ resetSearchCounter }, dispatch);

const SearchBlock = connect(null, mapDispatchToProps)(({ resetSearchCounter }) => {

    const [state, setState] = useState();

    const history = useHistory();

    return (
        <SearchBlock_>
            <input type='text' value={state} onChange={
                (e) => {
                    setState(e.target.value);

                }}
            />
            <button onClick={
                (e) => {
                    resetSearchCounter(); history.push('/clientes?q=' + state);
                }
            } />
        </SearchBlock_>
    );
});

function MenuBlock() {
    return (
        <MenuBlock_>
            <Link to='/adicionar' style={{ zIndex: 2 }}>
                <Icon src={assets.adicionar_cliente_icon} width='20px' height='20px' />
                Adicionar
            </Link>
            <Link to='/clientes' style={{ zIndex: 1 }}>
                <Icon src={assets.listagem_icon} width='20px' height='20px' />
                listagem
            </Link>
            <Link to='/sair' style={{ zIndex: 0 }}>
                <Icon src={assets.login_icon} width='20px' height='20px' />
                Sair
            </Link>
        </MenuBlock_>
    );
}
