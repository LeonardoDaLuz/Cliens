import { SearchContainer } from "./style";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import PubSub from 'pubsub-js'

export default function SearchInput() {

    const [state, setState] = useState<string>();
    const [timeoutId, setTimeoutId] = useState<any>(-1);

    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        let token = PubSub.subscribe('clear_search_input', () => { setState('') });

        return () => PubSub.unsubscribe(token);
    }, [])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        push();
    }

    function push(searchText = state) {
        history.push('/customers?q=' + searchText);
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

