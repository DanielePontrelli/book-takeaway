import { useLocation } from "react-router-dom";
import styles from '../style/BookChapter.module.css';
import {useState, useEffect} from 'react';
// import axios from 'axios';
// import { firebase } from "../Axios";
import {useDispatch, useSelector} from 'react-redux';
import { fetchTakeAways, pushTakeAways } from "../store/actions/handleBookTakeAways";

const BookChapter = () => {
    const location = useLocation() //mettendo lo state fuori da link e usando useParams riesco a passare i dati dello state a questa pagina
    // console.log(location.state)
    const {libro, capitolo, chapterKey, bookKey} = location.state;
    const [inputText, setInputText] = useState("");
    // const [takeAwayList, setTakeAwayList] = useState([]);

    // console.log('chapterKey from bookChapter', chapterKey);
    useEffect(() => {
        fetchBookTakeaways();
    }, [])

    const dispatch = useDispatch();
    const takeAwayList = useSelector(state => state.takeAwaysReducer.takeAwayList)

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const fetchBookTakeaways = async () => {
        dispatch(fetchTakeAways(bookKey, chapterKey));
        // try {
        //    const takeawaysData = await firebase.get(`booksData/${bookKey}/chapters/${chapterKey}.json`);
        // // console.log(takeawaysData);
        // // se da come risultato promises pending e' perche' hai dimenticato l'await 
        // setTakeAwayList(takeawaysData.data); 
        // } catch (error) {
        //     console.log(error);
        // }       
    }

    const pushNewTakeways = async (e) => {   
        e.preventDefault();
        dispatch(pushTakeAways(chapterKey, bookKey, inputText));
        // try { // put ci permette di scrivere dei dati senza creare una chiave
        //     const response = await firebase.put(`booksData/${bookKey}/chapters/${chapterKey}.json`, [...takeAwayList, inputText]);
        //     await fetchBookTakeaways();
        //     console.log(response);
            setInputText("");
        // } catch (error) {
        //     console.log(error);
        // }    
    }

    // const addTakeAway = (e) => {
    //     e.preventDefault(); //per non far ricaricare la pagina
    //     setTakeAwayList([...takeAwayList, inputText])
    //     setInputText("")
    // }

    const renderTakeAways = () => {
        return takeAwayList.map((takeAway, index) => {
            return <li key={index}>{takeAway}</li>
        })
    }
    return (
        <div className={styles.container}>
            <h3>{libro} - Capitolo {capitolo}</h3>
            <form onSubmit={pushNewTakeways}>
                <p>Aggiungi Key Takeaway</p>
                <input type="text" value={inputText} onChange={handleInputChange} />
            </form>
            <div>
                <ol>{renderTakeAways()}</ol>   
            </div>
            
        </div>
    )
}

export default BookChapter;