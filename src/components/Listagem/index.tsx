import { ListagemContainer, BottomLeftLoaderWheel, TableLoaderWheel, LoaderWheelInTheTitle, TableContainer } from "./style";
import { Button, Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { formatCPF } from "../../utils/formatCpf";
import { useEffect } from "react";
import store from "../../store";
import { bindActionCreators } from "redux";
import { loadMoreClients, resetSearchCounter, infiniteClientLoaderStart, infiniteClientLoaderStop } from "../../store/actions/clients.action";
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
    infiniteClientLoaderStart:  Function;
    infiniteClientLoaderStop: () => void;
}



function Listagem({ clientsState, loadMoreClients, resetSearchCounter, infiniteClientLoaderStart, infiniteClientLoaderStop , location }: props & RouteComponentProps) {

    let path = location.pathname;
    let query = location.search;

    const clientListTableRef = useRef<HTMLDivElement>(null);
    const loaderWheelinBottomLeftRef = useRef<HTMLDivElement>(null);
    const loaderWheelInTheTitleRef = useRef<HTMLDivElement>(null); 

    
    useEffect(()=> {

        infiniteClientLoaderStart(path, query, 30);

        return infiniteClientLoaderStop;

    }, []);

/*
    useEffect(() => {

        return desligaInfiniteLoader;

    }, [path, query, clientsState]);
*/

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
    bindActionCreators({ loadMoreClients, resetSearchCounter, infiniteClientLoaderStart, infiniteClientLoaderStop }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listagem));

