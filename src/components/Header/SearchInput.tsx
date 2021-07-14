import { SearchContainer } from "./style";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { resetSearchCounter } from "../../store/actions/clients.action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ resetSearchCounter }, dispatch);

const SearchInput = connect(null, mapDispatchToProps)(() => {

    const [state, setState] = useState<string>();

    const history = useHistory();
 
    return (
        <SearchContainer>
            <input type='text' value={state} onChange={
                (e) => {
                    setState(e.target.value);

                }}
            />
            <button onClick={
                (e) => {
                    resetSearchCounter(); history.push('/clientes?q=' + state);
                }
            } />
        </SearchContainer>
    );
});

export default SearchInput;
