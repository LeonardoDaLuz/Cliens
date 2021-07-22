import React from "react";
import { ApplicationState } from '../../store';
import { LoaderWheelInTheTitle_ } from './style';
import { connect, ConnectedProps } from "react-redux";

function LoaderWheelInThetitle({ clientsState }: ConnectedProps<typeof connector>) {

    if (!clientsState.loadCompleted && clientsState.status != "loaded") {
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

const connector = connect(mapStateToProps, {});


export default connector(LoaderWheelInThetitle);
