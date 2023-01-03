import { createStore, combineReducers } from 'redux';
import HistoryReducer from './reducers/history';

const reducers = combineReducers({
    history: HistoryReducer
});

const store = createStore(reducers);

export default store;