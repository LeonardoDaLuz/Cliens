import { ListagemContainer, BottomLeftLoaderWheel, TableLoaderWheel, LoaderWheelInTheTitle } from "./style";
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
    clientsState: clientsStore;
    loadMoreClients: Function;
    resetSearchCounter: Function;
}



function Listagem({ clientsState, loadMoreClients, resetSearchCounter, location }: props & RouteComponentProps) {

    let path = location.pathname;
    let query = location.search;

    const clientListTableRef = useRef<HTMLDivElement>(null);
    const loaderWheelinBottomLeftRef = useRef<HTMLDivElement>(null);
    const loaderWheelInTheTitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        let holdInfiniteLoader = true;

        async function infiniteLoaderStart() {

            console.log('infiniteLoaderStart')

            let tries = 3;

            let current = clientListTableRef.current;

            while (current && current.clientHeight < window.innerHeight && tries > 0) { //Faz com que mais produtos sejam carregados até que preencha a tela toda.
                console.log('aki');
                tries--;
                await loadMoreClients(path, query, 30); //Aqui, o location.pathname é usado pois este path é usado na especificação da busca na api.
            }


            while (holdInfiniteLoader) {

                if (window.pageYOffset > document.body.clientHeight - window.innerHeight - 4000 && tries > 0) {

                    let clientHeightBefore = document.body.clientHeight;

                    await loadMoreClients(path, query, 30);

                    await loadMoreClients(path, query, 30);

                    await loadMoreClients(path, query, 30);

                    if (clientHeightBefore === document.body.clientHeight) {
                        holdInfiniteLoader = false;
                    }

                } else {
                    await waitForSeconds(0.1);
                }
            }

            let wheelBottomLeft = loaderWheelinBottomLeftRef.current;
            alert('cabou');
            if (wheelBottomLeft) {
                wheelBottomLeft.setAttribute('style', "display: none;");
                alert('foi');
            }
        }

        function desligaInfiniteLoader() {
            console.log('desligaInfiniteLoader')
            holdInfiniteLoader = false;
        }

        infiniteLoaderStart();

        return desligaInfiniteLoader;

    }, [path, query]);


    let selectedClients = clientsState.data[mergePathWithQueryAndQuery(path, query)];


    //clientsState.status === 'loading' && !clientsState.searchCompleted 

    return (
        <ListagemContainer>
            <BottomLeftLoaderWheel ref={loaderWheelinBottomLeftRef} />
            <Container ref={clientListTableRef}>
                {JSON.stringify(location)}
                searchCompleted: {JSON.stringify(clientsState.searchCompleted)}
                <h1>
                    <Icon src={assets.listagem_icon} width='50px' height='50px' />
                    <span>Listagem</span>
                    <LoaderWheelInTheTitle ref={loaderWheelInTheTitleRef} />

                </h1>

                <Table lista={selectedClients} status={clientsState.status} searchCompleted={clientsState.searchCompleted} />

            </Container>
        </ListagemContainer>

    );
}

const mapStateToProps = (store: any) => ({
    clientsState: store.clients
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ loadMoreClients, resetSearchCounter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listagem));

