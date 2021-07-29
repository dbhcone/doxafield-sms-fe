import { Action, createReducer, on } from "@ngrx/store";
import { updateTitle } from "../actions/nav.actions";

const initialState = {title: ""};

const reducer = createReducer(
    initialState,
    on(updateTitle, (state, action) => {
        console.log('state', state);
        console.log('action', action);
        return {...state, title: action.title}
    })
 );

export function navReducer (state: {title: string} | undefined, action: Action) {
    return reducer(state, action);
}