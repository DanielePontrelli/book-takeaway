import { useParams } from "react-router-dom";
import {googleBooks} from '../Axios';
import styles from '../style/Book.module.css';
import { useEffect, useState } from "react";
import SingleChapter from "../components/SingleChapter";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
// import { v4 as uuidv4 } from 'uuid';
import Message from '../components/Message';
import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { firebase } from "../Axios";
import {useSelector, useDispatch} from "react-redux";
import {fetchChaptersData, createNewChapter} from "../store/actions/handleBookChapter"

function Book() {  
  const params =  useParams(); 
  // console.log(params);
  const bookID = params.id; 
  const location = useLocation();
  // console.log(location.state.bookKey);

  const[bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [chapterList, setChapterList] = useState([]); // {id: uuidv4()} ]);
  const [inputText, setInputText] = useState('');

  const dispatch = useDispatch();
  const chapterList = useSelector(state => state.chapterReducer.chapterList);

  // useEffect per gestire il caricamento dei dati
  useEffect(() => { 
    async function fetchData() {  
      try {
        const bookData = await googleBooks.get(`${bookID}`);
      // console.log(bookData.data.volumeInfo);
      await setBookData(bookData.data.volumeInfo);
      await fetchChapter();
      setLoading(false);
      }

      catch (error) {
        console.log(error);
      }      
    }
    fetchData();
  }, [bookID]);

  // Render dei capitoli
  const renderChapter = () => {
    const bookID = params.id;
    const bookKey = location.state.bookKey;
    return chapterList.map((key, index) => {
      return <SingleChapter 
      bookName={bookData.title} 
      bookID={bookID} 
      key={key} 
      chapterKey={key}
      bookKey={bookKey}
      // chapter={4} 
      number={index + 1} />
    })
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  }

  const handleNewChapter = async (e) => {
    e.preventDefault();
    const bookKey = location.state.bookKey;
    dispatch(createNewChapter(bookKey, inputText));
    setInputText("");
    // try{
    //   const response = await firebase.post(`booksData/${bookKey}/chapters.json`, [inputText])
    //   const newChapterList = [...chapterList, response.data.name];
    //   setChapterList(newChapterList);
    //   // console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const fetchChapter = () => {
    const bookKey = location.state.bookKey;
    dispatch(fetchChaptersData(bookKey));
    // try{
    //   const response = await firebase.get(`booksData/${bookKey}/chapters.json`);
    //   const myData = await response.data;
    //   const chapterList = [];
    //   for (let key in myData) {
    //     chapterList.push(key);
    //   }
    //   setChapterList(chapterList);
      // setInputText('');
    // } catch (error) {
    //   console.log(error);
    // }
  }
  

  // logica per aggiungere un capitolo
  // const addChapter = () => {
  //   setChapterList([...chapterList, {id: uuidv4()}]) //... serve a copiare l'array
  // }


  // 1. Prendere dati da API, Database , altra pagina;
  // 2. Mettere nello state;
  // 3. Far vedere i dati all'utente;

  const NextChapterNumber = chapterList.length + 1;

  // Return per fare render dell'interfaccia
  return loading ? (
  <Message message='CARICAMENTO...' />
  ) : (
  <div className={styles.container}>
    <div className={styles.infoContainer}>
      <div style={{width: '90%', paddingRight: '20px'}}>
        <h2>{bookData.title}</h2>
        <p>{bookData.description}</p>
        <h4>Autore: {bookData.authors[0]}</h4>
      </div>
      <img src={bookData.imageLinks.thumbnail} alt="" className={styles.image} />
    </div>
    <div className={styles.chapterContainer}>
      {renderChapter()}
      {/* <FontAwesomeIcon onClick={createNewChapter} style={{marginTop : '20px', cursor: 'pointer'}} size='2x' icon={faPlusSquare} /> */}
      <form style={{width: '90%', padding: '10px'}} onSubmit={handleNewChapter}>
        <input value={inputText} onChange={handleInputChange} type="text" placeholder={`aggiungi takeaway al capitolo ${NextChapterNumber} `} />
      </form>
    </div>
  </div>
    )
}

export default Book;

// const bookData = {
//   libro1: [
//     ['fsfs','efwefwe,efwef'], // capitolo 1
//     ['fsfs','efwefwe,efwef'], // capitolo 2
//     ['fsfs','efwefwe,efwef']  // capitolo 3
//   ]
// }