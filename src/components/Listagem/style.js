import styled from "styled-components";
import colorTheme from "../../colorTheme";

export const ListagemStyles = styled.div`



    h1 {
        color: white;
        margin: 25px 0px 25px 0px;
        vertical-align: center;
        filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.9));
    }

    span {
        vertical-align: middle;
    }
`;

export const Table_ = styled.table`
    width: 100%;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 5px;
    box-shadow:  0px 4px 4px rgba(0,0,0,0.4);

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
        background-color: white;
        padding: 15px;
    }
`;