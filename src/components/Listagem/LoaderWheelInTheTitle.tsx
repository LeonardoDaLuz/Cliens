import React from "react";
import { ClientsState } from '../../store/types/clients.types';
import { ApplicationState } from '../../store';
import { LoaderWheelInTheTitle_ } from './style';
import { connect } from "react-redux";

interface props {
    clientsState?: ClientsState,
}


function LoaderWheelInThetitle({ clientsState }: props): JSX.Element {

    if (!clientsState!.loadCompleted) {
        return (
            <LoaderWheelInTheTitle_>

            </LoaderWheelInTheTitle_>
        );
    } else {
        return <></>
    }
}

const mapStateToProps = (store: ApplicationState) => ({
    clientsState: store.clients
});


export default connect(mapStateToProps, null)(LoaderWheelInThetitle);
