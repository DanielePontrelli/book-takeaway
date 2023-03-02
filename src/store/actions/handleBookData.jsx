import {googleBooks} from '../../Axios'
import { firebase } from '../../Axios';
const GET_SAVED_BOOKS_IDS = "GET_SAVED_BOOKS_IDS";
const ADD_BOOK = "ADD_BOOK";
const FETCH_SINGLE_BOOK = "FETCH_SINGLE_BOOK";

const FETCH_BOOK_DATA_START = "FETCH_BOOK_DATA_START";
const FETCH_BOOK_DATA_SUCCESS = "FETCH_BOOK_DATA_SUCCESS";
const FETCH_BOOK_DATA_FAIL = "FETCH_BOOK_DATA_FAIL";

const FETCH_SAVED_BOOKS_START = "FETCH_SAVED_BOOKS_START";
const FETCH_SAVED_BOOKS_SUCCESS = "FETCH_SAVED_BOOKS_SUCCESS";
const FETCH_SAVED_BOOKS_FAIL = "FETCH_SAVED_BOOKS_FAIL";

// FETCH BOOK DATA
export const fetchBookData =  (inputText) => {
    if (inputText.trim() === '') { //.trim() seve a togliere gli spazi vuoti all'inizio e alla fine quindi la ricerca di spazio-spazio-spazio non dara' risultato
        return
    }
    return async dispatch => {
    dispatch(fetchBookDataStart());
    // la richiesta inizia
        try {
            await dispatch(getSavedBooksIDs());
            const myData = await googleBooks.get(`?q=${inputText}`);
            dispatch(fetchBookDataSuccess(myData.data));
            // dispatch({
            //    type: FETCH_BOOK_DATA,
            //    booksData: myData.data 
            // });
        // la richiesta e' stata fatta
        } catch (error) {
            console.log(error);

            dispatch(fetchBookDataFail(error))
            // c'e' stato un errore
        };
        
    };
};

export const fetchBookDataStart = () => {
    return {
        type: FETCH_BOOK_DATA_START
    }
}

export const fetchBookDataSuccess = (booksData) => {
    return {
        type: FETCH_BOOK_DATA_SUCCESS,
        booksData: booksData
    }
}

export const fetchBookDataFail = (error) => {
    return {
        type: FETCH_BOOK_DATA_FAIL,
        error: error
    }
};


// SAVED BOOKS ID
export const getSavedBooksIDs = () => {
    return async dispatch => {
       try {
            const response = await firebase.get('booksData.json');
            const data = response.data;
            // console.log('data da firebase', data);
            const allIDs = [];
            for (let key in data) {
                allIDs.push(data[key].bookId);
            }

            dispatch({
                type: GET_SAVED_BOOKS_IDS,
                savedIDs: allIDs
            })
            // console.log('id salvati', savedIDs);

        } catch (error) {
        console.log(error);
        } 
    }
    
}

// FETCH SAVED BOOKS
export const fetchSavedBooks =  () => {
    return async dispatch => {
        dispatch(fetchSavedBooksStart())
        try {
            const response = await firebase.get('booksData.json');
            const bookList = [];
            for (let key in response.data) {
              bookList.push({  
                title: response.data[key].bookTitle,
                id: response.data[key].bookId,
                key: key,
              })
            }
            dispatch(fetchSavedBooksSuccess(bookList))
          } catch (error) {
            console.log(error);
            dispatch(fetchSavedBooksFail(error))
          }
        
    };
};

export const fetchSavedBooksStart = () => {
    return {
        type: FETCH_SAVED_BOOKS_START
    }
}

export const fetchSavedBooksSuccess = (savedBooks) => {
    return {
        type: FETCH_SAVED_BOOKS_SUCCESS,
        savedBooks: savedBooks
    }
}

export const fetchSavedBooksFail = (error) => {
    return {
        type: FETCH_SAVED_BOOKS_FAIL,
        error: error
    }
}


// ADD NEW BOOK
export const addNewBook = (id, title) => {
    return async dispatch => {
        // setLoading(true);
        try {
            const data = await firebase.post("booksData.json", {
            bookId: id,
            bookTitle: title,
        });
        await dispatch(getSavedBooksIDs());
        console.log(data);
        // setLoading(false);
        // setError(false);
        } catch (error) {
            console.log(error);
            // setLoading(false);
            // setError(true);
        } 
    }
    
}



export {
    GET_SAVED_BOOKS_IDS,
    ADD_BOOK,
    FETCH_SINGLE_BOOK,

    FETCH_BOOK_DATA_START,
    FETCH_BOOK_DATA_SUCCESS,
    FETCH_BOOK_DATA_FAIL,
    
    FETCH_SAVED_BOOKS_START,
    FETCH_SAVED_BOOKS_SUCCESS,
    FETCH_SAVED_BOOKS_FAIL
}