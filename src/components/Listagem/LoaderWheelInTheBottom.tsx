import React from "react";
import { ApplicationState } from '../../store';
import { BottomLeftLoaderWheel } from './style';
import { connect, ConnectedProps } from "react-redux";



const LoaderWheelInTheBottom = ({ clientsState }: ConnectedProps<typeof connector>) => {

    if (!clientsState.loadCompleted && clientsState.status != "loaded") {
        return (
            <div>
                <BottomLeftLoaderWheel>

                </BottomLeftLoaderWheel>
            </div>);
    } else {
        return <></>
    }
}

const mapStateToProps = (store: ApplicationState) => ({
    clientsState: store.clients
});

const connector = connect(mapStateToProps, {});

export default connector(LoaderWheelInTheBottom);
