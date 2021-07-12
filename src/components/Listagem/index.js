import { ListagemStyles, Table_ } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { useEffect } from "react";
import store from "../../store";
import { bindActionCreators } from "redux";
import { loadMoreClients, resetSearchCounter } from "../../store/actions/clients.action";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function Listagem({ clients, loadMoreClients, resetSearchCounter, location }) {

    let path = location.pathname;
    let query = location.search;

    useEffect(() => {
        loadMoreClients(path, query, 3);
    }, []);

    return (
        <ListagemStyles>
            {JSON.stringify(location)}<br></br>
        {(path + '?' + query)}<br></br>
            <Container>
                <h1>
                    <Icon src={assets.listagem_icon} width='50px' height='50px' />
                    <span>Listagem</span>
                </h1>
                <button onClick={(e)=>{e.preventDefault(); loadMoreClients(path, query, 3)}}></button>
                <Table lista={clients.data[path + '?' + query]} />
            </Container>
        </ListagemStyles>

    );
}

const mapStateToProps = store => ({
    clients: store.clients
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ loadMoreClients, resetSearchCounter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listagem));

function Table({ lista }) {
    
    if(!lista)
        return null;

    return (
        <Table_>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                    <th>Opções </th> 
                </tr>
            </thead>
            <tbody>
                {lista.map((item, index) => {
                    return (
                        <tr>
                            <td>{index} - {item["nome"]}</td>
                            <td>{formatCPF(item["cpf"])} </td>
                            <td>{item["email"].toLocaleLowerCase()} </td>
                            <td>{item["endereco"]['cidade']} </td>
                            <td>
                                <Button>
                                    <Icon src={assets.edit_icon} height='16px' width='16px' />
                                </Button>
                                <Button>
                                    <Icon src={assets.delete_icon} height='16px' width='16px' />
                                </Button>
                            </td>
                        </tr>
                    );
                })}

            </tbody>
        </Table_>
    );
}