import { firebase } from "../../Axios";
const CREATE_NEW_CHAPTERS = "CREATE_NEW_CHAPTERS";
const FETCH_BOOK_CHAPTERS = "FETCH_BOOK_CHAPTERS";
const CREATE_NEW_TAKEAWAYS = "CREATE_NEW_TAKEAWAYS";

const FETCH_CHAPTERS_DATA_START = "FETCH_CHAPTERS_DATA_START";
const FETCH_CHAPTERS_DATA_SUCCESS = "FETCH_CHAPTERS_DATA_SUCCESS";
const FETCH_CHAPTERS_DATA_FAIL = "FETCH_CHAPTERS_DATA_FAIL";

const CREATE_NEW_CHAPTERS_START = "CREATE_NEW_CHAPTERS_START";
const CREATE_NEW_CHAPTERS_SUCCESS = "CREATE_NEW_CHAPTERS_SUCCESS";
const CREATE_NEW_CHAPTERS_FAIL = "CREATE_NEW_CHAPTERS_FAIL";


export const fetchChaptersData = (bookKey) => {
    return async dispatch => {
        dispatch(fetchChaptersDataStart());
        try{
            const response = await firebase.get(`booksData/${bookKey}/chapters.json`);
            const myData = await response.data;
            const chapterList = [];
            for (let key in myData) {
              chapterList.push(key);
            }
            dispatch(fetchChaptersDataSuccess(chapterList));
            // setInputText('');
        } catch (error) {
            dispatch(fetchChaptersDataFail(error));
            console.log(error);
        }
    }
}

export const fetchChaptersDataStart = () => {
    return {
        type: FETCH_CHAPTERS_DATA_START
    }
}

export const fetchChaptersDataSuccess = (chapterList) => {
    return {
        type: FETCH_CHAPTERS_DATA_SUCCESS,
        chapterList: chapterList
    }
}

export const fetchChaptersDataFail = (error) => {
    return {
        type: FETCH_CHAPTERS_DATA_FAIL,
        error: error
    }
};



// create new chapters
export const createNewChapter = (bookKey, inputText) => {
    return async dispatch => {
        dispatch(createNewChapterStart())
        try{
            const response = await firebase.post(`booksData/${bookKey}/chapters.json`, [inputText])
            // const newChapterList = [...chapterList, response.data.name];
            // setChapterList(newChapterList);
            // console.log(response);
            dispatch(createNewChapterSuccess(response.data.name))
        } catch (error) {
            dispatch(createNewChapterFail())
            console.log(error);
        }
    }
}

export const createNewChapterStart = () => {
    return {
        type: CREATE_NEW_CHAPTERS_START
    }
}

export const createNewChapterSuccess = (newChapter) => {
    return {
        type: CREATE_NEW_CHAPTERS_SUCCESS,
        newChapter: newChapter
    }
}

export const createNewChapterFail = (error) => {
    return {
        type: CREATE_NEW_CHAPTERS_FAIL,
        error: error
    }
};

export {
    CREATE_NEW_CHAPTERS,
    FETCH_BOOK_CHAPTERS,
    CREATE_NEW_TAKEAWAYS,
    FETCH_CHAPTERS_DATA_START,
    FETCH_CHAPTERS_DATA_SUCCESS,
    FETCH_CHAPTERS_DATA_FAIL,
    CREATE_NEW_CHAPTERS_START,
    CREATE_NEW_CHAPTERS_SUCCESS,
    CREATE_NEW_CHAPTERS_FAIL
}