import styled from "styled-components";
import colorTheme from "../../colorTheme";
import { LoaderWheel } from "../../globalStyle";

export const ListagemContainer = styled.div`

    h1 {
        color: white;
        margin: 25px 0px 25px 0px;
        vertical-align: center;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.9));
    }

    span {
        vertical-align: middle;
    }

    padding-bottom: 100px;
`;

export const TableContainer = styled.table`
    width: 100%;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 5px;
    box-shadow:  0px 4px 4px rgba(0,0,0,0.4);
    background-color: white;
    thead {
        background-color: ${colorTheme.secondary.darken(0.1)};
        box-shadow:  0px 3px 5px rgba(0,0,0,0.4);
        z-index:5;
        color: white;   
        position:relative;        
    }

    th {
        padding: 5px 20px 5px 20px;
        
    }
    td {
        padding: 8px 20px 8px 20px;
        color: ${colorTheme.title};
        font-weight: 500;
        letter-spacing: 0.5px;

        button {
            padding: 5px;
            margin: 0px 5px;
            line-height: 16px!important;
            box-shadow: 0px 5px 0px ${colorTheme.subtlePrimary.darken(0.3)},
                0px 5px 5px black;
            ;
        }
    }

    tr:last-child>td {
        padding-bottom: 20px;

    }

    tbody {

        padding: 15px;
    }

    tfoot {
        text-align: center;
    }
`;

export const BottomLeftLoaderWheel = styled(LoaderWheel)`
    display: block;
    position: fixed;
    left: 15px;
    bottom: 15px;
    margin: 5px 5px;
    background-color: ${colorTheme.tertiary};
    border-radius: 50%;
    background-size: 80%;
`;

export const LoaderWheelInTheTitle_ = styled(LoaderWheel)`
    display: inline-block;
    margin: 0px 20px;
    background-color: ${colorTheme.tertiary};
    border-radius: 50%;
    background-size: 80%;
`;

export const TableLoaderWheel = styled(LoaderWheel)`
    margin: 5px 5px;
    border-radius: 50%;
    background-size: 80%;
`;