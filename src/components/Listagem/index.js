import { ListagemStyles, Table_, BottomLeftLoaderWheel, TableLoaderWheel } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { useEffect } from "react";
import store from "../../store";
import { bindActionCreators } from "redux";
import { loadMoreClients, resetSearchCounter } from "../../store/actions/clients.action";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { mergePathWithQueryAndQuery } from "../../utils/mergePathWithQueryAndQuery";
import { waitForSeconds } from "../../utils/waitForSeconds";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
function Listagem({ clients, loadMoreClients, resetSearchCounter, location }) {

    let path = location.pathname;
    let query = location.search;

    const clientListTableRef = useRef(null);

    let holdInfiniteLoader = true;



    useEffect(() => {
        //loadMoreClients(path, query, 3);

        infiniteLoaderStart();

        return desligaInfiniteLoader;

    }, [location.pathname, location.search]);

    async function infiniteLoaderStart() {

        let tries = 5;

        while (clientListTableRef.current.clientHeight < window.innerHeight && tries > 0) { //Faz com que mais produtos sejam carregados até que preencha a tela toda.

            tries--;
            await loadMoreClients(path, query, 30); //Aqui, o location.pathname é usado pois este path é usado na especificação da busca na api.
        }

        while (holdInfiniteLoader) {

            if (window.pageYOffset > document.body.clientHeight - window.innerHeight - 1200) {
                await loadMoreClients(path, query, 30);
            } else {
                await waitForSeconds(0.1);
            }
        }
    }

    function desligaInfiniteLoader() {
        holdInfiniteLoader = false;
    }

    let selectedClients = clients.data[mergePathWithQueryAndQuery(path, query)];    

   // let showTopLeftLoaderWheel = clients.status === 'loading' && window.pageYOffset < document.body.clientHeight -500;
//           <button onClick={(e) => { e.preventDefault(); loadMoreClients(path, query, 3) }}></button>
    return (
        <ListagemStyles>
            {
                clients.status === 'loading' && !clients.searchCompleted && <BottomLeftLoaderWheel />
            }
            <Container ref={clientListTableRef}>
{JSON.stringify(location)}
                <h1>
                    <Icon src={assets.listagem_icon} width='50px' height='50px' />
                    <span>Listagem</span>

                </h1>
     
                <Table lista={selectedClients} status={clients.status} searchCompleted={clients.searchCompleted} />

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

function Table({ lista, status, searchCompleted }) {

    return (
        <Table_>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Cidade</th>
                    <th  width='140px'>Opções </th>
                </tr>
            </thead>
            <tbody>
                {lista && lista!=='not found' && lista.map((item, index) => {
                    return (
                        <tr>
                            <td>{index} - {item["nome"]}</td>
                            <td>{formatCPF(item["cpf"])} </td>
                            <td>{item["email"].toLocaleLowerCase()} </td>
                            <td>{item["endereco"]['cidade']} </td>
                            <td width='140px'>
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
            <tfoot>
                <td colSpan='5'>
                    {
                       !searchCompleted && <TableLoaderWheel />
                    }  
                                        {
                       searchCompleted && <span>Pesquisa concluída</span>
                    }                       
                    </td>
            </tfoot>
        </Table_>
    );
}