import React from 'react';
import { ListagemContainer, SearchDetail } from "./style";
import { Container, Icon } from "../../globalStyle";
import assets from "../../assets";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useLocation } from "react-router";
import { mergePathWithQueryAndQuery } from "../../utils/mergePathWithQueryAndQuery";
import Table from "./table";
import LoaderWheelInTheTitle from './LoaderWheelInTheTitle';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store/hooks';
import { infiniteCustomerLoaderThunk, infiniteCustomerLoaderStop, reconfigureInfiniteLoader } from '../../store/customers';

function Listagem() {

    const location = useLocation();
    const path = '/clientes';

    const query = location.search;

    const clientsState = useSelector((state: RootState) => state.customers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(infiniteCustomerLoaderThunk(location.pathname, location.search, 30))
        return () => { dispatch(infiniteCustomerLoaderStop()) };
    }, []);


    useEffect(() => {
        dispatch(reconfigureInfiniteLoader({ path, query }));
    }, [path, query]);


    const selectedClients = clientsState.data[mergePathWithQueryAndQuery(path, query)];

    const searchedText = query.startsWith('?q=') ? query.replace('?q=', '') : '';

    return (
        <ListagemContainer>

            <Container>
                <div>
                    <h1>
                        <Icon src={assets.listagem_icon} width='50px' height='50px' />
                        <span>Listagem</span>

                    </h1>
                    <LoaderWheelInTheTitle />
                    {searchedText &&
                        <SearchDetail>
                            <span>Busca para: {searchedText}</span>
                        </SearchDetail>
                    }
                </div>
                
                <Table lista={selectedClients} status={clientsState.status} loadCompleted={clientsState.loadCompleted} />

            </Container>
        </ListagemContainer>

    );
}


export default Listagem;

