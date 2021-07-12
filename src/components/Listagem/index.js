import { ListagemStyles } from "./style";
import { Container, Icon } from "../../globalStyle";
import assets from "../../assets";

export default function Listagem() {
    return (
        <ListagemStyles>
            <Container>
                <h1>
                    <Icon src={assets.listagem_icon} width='50px' height='50px' />
                    <span>Listagem</span>
                </h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>cpf</th>
                            <th>cpf</th>
                        </tr>
                    </thead>
                </table>
                <tbody>
                    <tr>
                        <td>asdasd</td>
                        <td>asdsa </td>
                        <td>asd </td>
                    </tr>
                </tbody>
            </Container>
        </ListagemStyles>

    );
}