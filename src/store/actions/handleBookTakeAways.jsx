import { firebase } from "../../Axios";

const FETCH_TAKEAWAYS_START = "FETCH_TAKEAWAYS_START";
const FETCH_TAKEAWAYS_SUCCESS = "FETCH_TAKEAWAYS_SUCCESS";
const FETCH_TAKEAWAYS_FAIL = "FETCH_TAKEAWAYS_FAIL";

const PUSH_TAKEAWAY_START = "PUSH_TAKEAWAY_START";
const PUSH_TAKEAWAY_SUCCESS = "PUSH_TAKEAWAY_SUCCESS";
const PUSH_TAKEAWAY_FAIL = "PUSH_TAKEAWAY_FAIL";



export const fetchTakeAways = (bookKey, chapterKey) => {
    return async dispatch => {
        dispatch(fetchTakeAwaysStart());
        try {
            const takeAwaysData = await firebase.get(`booksData/${bookKey}/chapters/${chapterKey}.json`);
         // console.log(takeawaysData);
         // se da come risultato promises pending e' perche' hai dimenticato l'await 
         dispatch(fetchTakeAwaysSuccess(takeAwaysData.data))
        //  setTakeAwayList(takeAwaysData.data); 
         } catch (error) {
            dispatch(fetchTakeAwaysFail(error))
             console.log(error);
         }
    }
}

const fetchTakeAwaysStart = () => {
    return {
        type: FETCH_TAKEAWAYS_START
    }
}

const fetchTakeAwaysSuccess = (takeAwaysData) => {
    return {
        type: FETCH_TAKEAWAYS_SUCCESS,
        takeAwaysData: takeAwaysData
    }
}

const fetchTakeAwaysFail = (error) => {
    return {
        type: FETCH_TAKEAWAYS_FAIL,
        error: error
    }
};


// push take away
export const pushTakeAways = (bookKey, chapterKey, inputText) => {
    return async (dispatch, getState) => {
        const takeAwayList = getState().takeAwaysReducer.takeAwayList;
        dispatch(pushTakeAwayStart());
        try { // put ci permette di scrivere dei dati senza creare una chiave
            const response = await firebase.put(`booksData/${bookKey}/chapters/${chapterKey}.json`, [...takeAwayList, inputText]);
            // await fetchBookTakeaways();
            console.log(response);
            dispatch(pushTakeAwaySuccess(inputText))
            // setInputText("");
        } catch (error) {
            dispatch(pushTakeAwayFail(error))
            console.log(error);
        }   
    }
}

const pushTakeAwayStart = () => {
    return {
        type: PUSH_TAKEAWAY_START
    }
}

const pushTakeAwaySuccess = (inputText) => {
    return {
        type: PUSH_TAKEAWAY_SUCCESS,
        inputText: inputText
    }
}

const pushTakeAwayFail = (error) => {
    return {
        type: PUSH_TAKEAWAY_FAIL,
        error: error
    }
};


export {
    FETCH_TAKEAWAYS_START,
    FETCH_TAKEAWAYS_SUCCESS,
    FETCH_TAKEAWAYS_FAIL,
    PUSH_TAKEAWAY_START,
    PUSH_TAKEAWAY_SUCCESS,
    PUSH_TAKEAWAY_FAIL
}