import { ADD_HISTORY } from '../types';

const default_state = [];

const reducer = (state = default_state, action) => {
    switch (action.type) {
        case ADD_HISTORY:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reducer;