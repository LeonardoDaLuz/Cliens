/* eslint-disable no-constant-condition */
import React from "react";
import { ApplicationState } from '../../store';
import { LoaderWheelInTheTitle_ } from './style';
import { connect, ConnectedProps } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";

function LoaderWheelInThetitle({ clientsState }: ConnectedProps<typeof connector>) {

    const elementRef = useRef<HTMLDivElement>(null);

    function waitTochangePositionOnScrollDown() {
        if (elementRef.current) {
            if (window.pageYOffset > document.body.clientHeight - window.innerHeight - 10)
                elementRef.current.classList.add('hidden');
            else
                elementRef.current.classList.remove('hidden');


            if (window.pageYOffset > 150)
                elementRef.current.classList.add('move-to-bottom');
            else
                elementRef.current.classList.remove('move-to-bottom');
        }
    }

    useEffect(() => {



        waitTochangePositionOnScrollDown();

        window.addEventListener('scroll', waitTochangePositionOnScrollDown);

        //const intervalId = setInterval(waitTochangePositionOnScrollDown, 100);

        return () => window.removeEventListener('scroll', waitTochangePositionOnScrollDown);

    }, []);

    useEffect(() => {
        waitTochangePositionOnScrollDown();
    }, [clientsState])

    if (!clientsState.loadCompleted && clientsState.status !== "loaded") {
        return (
            <LoaderWheelInTheTitle_ ref={elementRef}>

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
