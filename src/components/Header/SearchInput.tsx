import { SearchContainer } from "./style";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { setClientLoadPathAndQuery } from "../../store/actions/clients.action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setClientLoadPathAndQuery }, dispatch);

function SearchInput_() {

    const [state, setState] = useState<string>();
    const [timeoutId, setTimeoutId] = useState<any>(-1);

    const history = useHistory();

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        push();
    }

    function push(searchText = state) {
        history.push('/clientes?q=' + searchText);
    }

    return (
        <SearchContainer>
            <form onSubmit={onSubmit}>
                <input type='text' value={state} onChange={
                    async (e) => {
                        setState(e.target.value);
                        clearTimeout(timeoutId);
                        const _timeoutId: any = setTimeout(() => push(e.target.value), 500);
                        setTimeoutId(_timeoutId);

                    }}
                />
                <button type='submit' />
            </form>
        </SearchContainer>
    );
}

const SearchInput = connect(null, mapDispatchToProps)(SearchInput_);

export default SearchInput;
