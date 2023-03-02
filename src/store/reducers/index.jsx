import bookReducer from './bookReducer';
import chapterReducer from './chapterReducer';
import takeAwaysReducer from './takeAwaysReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({ //se si deve assegnare all'oggetto lo stesso nome si puo' pure scrivere solo una volta il nome senza asseganre
    bookReducer: bookReducer,
    chapterReducer: chapterReducer,
    takeAwaysReducer: takeAwaysReducer
})

export default rootReducer;