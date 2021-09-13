import styled from "styled-components";
import colorTheme from "../../colorTheme";
import { LoaderWheel } from "../../globalStyle";

export const EditarStyles = styled.div`

    form {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }

    fieldset {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;
        border-radius: 20px;
        border: 2px solid ${colorTheme.primary.lighten(0.5)};

        legend {
            color: ${colorTheme.primaryText};
            font-weight: 600;
        }

 
    }

    fieldset::after {
        content: '';
        flex-grow: 1000000000;
    }

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

export const CenterButtons = styled.div`
    width: 300px;
    margin: 20px auto;

    button {
        margin: 5px;
        padding: 10px 10px 10px 3px;
    }
`;

export const CenteredLoaderWheel = styled(LoaderWheel)`
    display: block;
    margin: 200px auto;
    width: 100px;
    height: 100px;
`;