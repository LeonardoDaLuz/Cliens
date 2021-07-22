import React from "react";
import { ClientsState } from '../../store/types/clients.types';
import { ApplicationState } from '../../store';
import { BottomLeftLoaderWheel } from './style';
import { connect } from "react-redux";

interface props {
    clientsState?: ClientsState,
}


function LoaderWheelInTheBottom({ clientsState }: props): JSX.Element {

    if (!clientsState!.loadCompleted) {
        return (
            <BottomLeftLoaderWheel>

            </BottomLeftLoaderWheel>
        );
    } else {
        return <></>
    }
}

const mapStateToProps = (store: ApplicationState) => ({
    clientsState: store.clients
});


export default connect(mapStateToProps, null)(LoaderWheelInTheBottom);
