import React from "react";
import { ApplicationState } from '../../store';
import { BottomLeftLoaderWheel } from './style';
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";



const LoaderWheelInTheBottom = ({ clientsState }: ConnectedProps<typeof connector>) => {

    const elementRef = useRef(null);
    useEffect(()=> {

        /*
        async function hideWhenOnTop() {

        }*/

    })

    if (!clientsState.loadCompleted && clientsState.status != "loaded") {
        return (
            <div>
                <BottomLeftLoaderWheel ref={elementRef}>

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
