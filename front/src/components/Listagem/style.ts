import styled from "styled-components";
import assets from "../../assets";
import colorTheme from "../../colorTheme";
import { LoaderWheel } from "../../globalStyle";

export const ListagemContainer = styled.div`

    h1 {
        color: white;
        margin: 25px 0px 25px 0px;
        vertical-align: center;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.9));
        display: inline-block;
        flex: 1 0 auto;
    }

    span {
        vertical-align: middle;
    }

    padding-bottom: 100px;
`;

export const SearchDetail = styled.div`
    display: inline-block;
    color: white;
    margin-left: 10px;
    font-weight: 600;
`;

export const TableContainer = styled.table`
    width: 100%;
    border-spacing: 0;
    border-radius: 5px;

    color: white;
    border-collapse: collapse;
    position: relative;


    thead {
        tr {
        background-color:  white;
        }
          
    }

    th {
        padding: 5px 20px 5px 20px;
        background-color: ${colorTheme.secondary.darken(0.1)};
      
        top: 0px;
        z-index: 2;
        

        @media(max-width: 800px) {
            padding: 3px 6px 3px 6px;
        }

        &:first-child {
            border-radius: 5px 0px 0px 0px;
        }

        &:last-child {
            border-radius: 0px 5px 0px 0px;
        }
    }

    td {
        padding: 8px 20px 8px 20px;

        @media(max-width: 800px) {
            padding: 3px 6px 3px 6px;
        }

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
     //   padding-bottom: 20px;

    }

    tbody {
        background-color: white;
        padding: 15px;
        box-shadow:  0px 3px 5px rgba(0,0,0,0.4);
        z-index:5;

        
        tr:nth-child(2n) {

            td {
                padding: 0px;
            }

            hr {         
                margin: 0px 13px;
                border: none;
                border-bottom: 1px solid ${colorTheme.secondary.lighten(0.1)};
            }
        }


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
    margin: 5px 10px;
    padding: 0px;
    background-color: ${colorTheme.tertiary};
    background-image: url(${assets.update_icon_2});
    border-radius: 50%;
    flex: 0 0 auto;

    &.move-to-bottom {
        position: fixed;
        display: block;
        left: 25px;
        bottom: 25px;
    }

    &.hidden {        
        display: none!important;
    }
`;

export const TableLoaderWheel = styled(LoaderWheel)`

    border-radius: 50%;
    background-size: 80%;
`;