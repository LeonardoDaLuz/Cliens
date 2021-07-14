import { ListagemContainer, BottomLeftLoaderWheel, TableLoaderWheel } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { useEffect } from "react";
import store from "../../store";
import { bindActionCreators } from "redux";
import { loadMoreClients, resetSearchCounter } from "../../store/actions/clients.action";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { mergePathWithQueryAndQuery } from "../../utils/mergePathWithQueryAndQuery";
import { waitForSeconds } from "../../utils/waitForSeconds";
import { useRef } from "react";
import Table from "./table";

type clientsStore = {
    status: string,
    pointer: Number,
    lastKey: string,
    data: { [key: string]: [] },
    searchCompleted: boolean,
}

type props = {
    clients: clientsStore;
    loadMoreClients: Function;
    resetSearchCounter: Function;
}



function Listagem({ clients, loadMoreClients, resetSearchCounter, location }: props & RouteComponentProps) {

    let path = location.pathname;
    let query = location.search;

    const clientListTableRef = useRef<HTMLElement>(null);

    let holdInfiniteLoader = true;



    useEffect(() => {
        //loadMoreClients(path, query, 3);

        infiniteLoaderStart();

        return desligaInfiniteLoader;

    }, [location.pathname, location.search]);

    async function infiniteLoaderStart() {

        let tries = 5;

        let current = clientListTableRef.current;

        while (current && current.clientHeight < window.innerHeight && tries > 0) { //Faz com que mais produtos sejam carregados até que preencha a tela toda.

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
        <ListagemContainer>
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
        </ListagemContainer>

    );
}

const mapStateToProps = (store: any) => ({
    clients: store.clients
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ loadMoreClients, resetSearchCounter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listagem));

