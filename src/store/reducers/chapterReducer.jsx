import * as actionType from '../actions/handleBookChapter'; // * significa che si importa tutto quello che c'e' esportato da quella pagina

const initialState = {
    chapterList: [],
    loading: false,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_CHAPTERS_DATA_START:
            return {
                ...state,
                loading: true,
                error: false
            };

        case actionType.FETCH_CHAPTERS_DATA_SUCCESS:
            return {
                ...state,
                chapterList: action.chapterList,
                loading: false,
                error: false
            };
        
        case actionType.FETCH_CHAPTERS_DATA_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };

// create new chapter
        case actionType.CREATE_NEW_CHAPTERS_START:
            return {
                ...state,
                loading: true,
                error: false
            };

        case actionType.CREATE_NEW_CHAPTERS_SUCCESS:
            return {
                ...state,
                chapterList: [...state.chapterList, action.newChapter],
                loading: false,
                error: false
            };
        
        case actionType.CREATE_NEW_CHAPTERS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };

        default:
            return state;
    }
}

export default reducer;