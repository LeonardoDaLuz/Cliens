import { SearchContainer } from "./style";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { setClientLoadPathAndQuery } from "../../store/actions/clients.action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setClientLoadPathAndQuery }, dispatch);

function SearchInput_ () {

    const [state, setState] = useState<string>();

    const history = useHistory();

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        history.push('/clientes?q=' + state);
    }

    return (
        <SearchContainer>
            <form onSubmit={onSubmit}>
                <input type='text' value={state} onChange={
                    (e) => {
                        setState(e.target.value);

                    }}
                />
                <button type='submit' />
            </form>
        </SearchContainer>
    );
}

const SearchInput = connect(null, mapDispatchToProps)(SearchInput_);

export default SearchInput;
