import * as actionType from '../actions/handleBookData'; // * significa che si importa tutto quello che c'e' esportato da quella pagina

const initialState = {
    booksData: [],
    savedIDs: [],
    loading: false,
    error: false,
    savedBooks: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_BOOK_DATA_START:
            return {
                ...state,
                loading: true
            };

        case actionType.FETCH_BOOK_DATA_SUCCESS:
            return {
                ...state,
                booksData: action.booksData,
                loading: false,
                error: false
            };

        case actionType.FETCH_BOOK_DATA_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }




        case actionType.FETCH_SAVED_BOOKS_START:
            return {
                ...state,
                loading: true
            };
    
        case actionType.FETCH_SAVED_BOOKS_SUCCESS:
            return {
                ...state,
                savedBooks: action.savedBooks,
                loading: false,
                error: false
            };
    
        case actionType.FETCH_SAVED_BOOKS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }




        case actionType.GET_SAVED_BOOKS_IDS:
            return {
                ...state,
                savedIDs: action.savedIDs
            }

        case actionType.ADD_BOOK:
            return state;      
    
        default:
            return state;
    }
}

export default reducer;