import React from 'react';
import { ListagemContainer, BottomLeftLoaderWheel } from "./style";
import { Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { infiniteClientLoaderStart, infiniteClientLoaderStop, setClientLoadPathAndQuery } from "../../store/actions/clients.action";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { mergePathWithQueryAndQuery } from "../../utils/mergePathWithQueryAndQuery";
import { useRef } from "react";
import Table from "./table";
import { ApplicationState } from '../../store'
import { ClientsState } from '../../store/types/clients.types'
import LoaderWheelInTheBottom from './LoaderWheelInTheBottom';
import LoaderWheelInTheTitle from './LoaderWheelInTheTitle';

type props = {
    clientsState: ClientsState;
    infiniteClientLoaderStart: typeof infiniteClientLoaderStart;
    infiniteClientLoaderStop: () => void;
    setClientLoadPathAndQuery: typeof setClientLoadPathAndQuery;
}



function Listagem({ clientsState, infiniteClientLoaderStart, infiniteClientLoaderStop, setClientLoadPathAndQuery, location }: props & RouteComponentProps) {

    const path = location.pathname;
    const query = location.search;

    const loaderWheelInTheTitleRef = useRef<HTMLDivElement>(null);


    useEffect(() => {

        infiniteClientLoaderStart(location.pathname, location.search, 30);

        return infiniteClientLoaderStop;

    }, []);


    useEffect(() => {

        setClientLoadPathAndQuery(path, query);

    }, [path, query, setClientLoadPathAndQuery]);


    const selectedClients = clientsState.data[mergePathWithQueryAndQuery(path, query)];

    return (
        <ListagemContainer>
            <LoaderWheelInTheBottom />
            <Container>              
             
                <h1>
                    <Icon src={assets.listagem_icon} width='50px' height='50px' />
                    <span>Listagem</span>
                    <LoaderWheelInTheTitle />

                </h1>

                <Table lista={selectedClients} status={clientsState.status} loadCompleted={clientsState.loadCompleted} />

            </Container>
        </ListagemContainer>

    );
}

const mapStateToProps = (store: ApplicationState) => ({
    clientsState: store.clients
});

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ infiniteClientLoaderStart, infiniteClientLoaderStop, setClientLoadPathAndQuery }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Listagem));

