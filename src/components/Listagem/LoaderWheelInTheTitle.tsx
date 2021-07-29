/* eslint-disable no-constant-condition */
import React from "react";
import { LoaderWheelInTheTitle_ } from './style';
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { RootState } from "../../store";

function LoaderWheelInThetitle() {

    const clientsState = useSelector((state: RootState) => state.customers);

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


export default LoaderWheelInThetitle;
