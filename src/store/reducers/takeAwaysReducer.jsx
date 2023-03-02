import * as actionType from '../actions/handleBookTakeAways'; // * significa che si importa tutto quello che c'e' esportato da quella pagina

const initialState = {
    takeAwayList: [],
    error: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_TAKEAWAYS_START:
            return {
                ...state,
                loading: true,
                error: false
            };

        case actionType.FETCH_TAKEAWAYS_SUCCESS:
            return {
                ...state,
                takeAwayList: action.takeAwaysData,
                loading: false,
                error: false
            };
        
        case actionType.FETCH_TAKEAWAYS_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };


        // push take away
        case actionType.PUSH_TAKEAWAY_START:
            return {
                ...state,
                loading: true,
                error: false
            };

        case actionType.PUSH_TAKEAWAY_SUCCESS:
            return {
                ...state,
                takeAwayList: [...state.takeAwayList, action.inputText],
                loading: false,
                error: false
            };
        
        case actionType.PUSH_TAKEAWAY_FAIL:
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