import { ADD_HISTORY } from '../types';

export const addHistory = (payload) => ({
    type: ADD_HISTORY,
    payload: payload,
});