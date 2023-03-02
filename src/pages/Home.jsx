import Results from "../components/Results";
import {useState} from 'react'; 
// import { firebase } from "../Axios";
// import {googleBooks} from '../Axios';
import {fetchBookData, addNewBook} from '../store/actions/handleBookData';
import styles from '../style/Searchbar.module.css';
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
// per collegare una pagina ad un altra usiamo react router
// npm install react-router-dom

function App() {
  // const fetchData = () => {
  //   const myData = fetch('https://www.googleapis.com/books/v1/volumes?q=harry');
  //   const data = myData.json;
  //   console.log(data)
  // }

  // const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  // const [loading, setLoading] = useState(true); //per mostrare che stia caricando prima dei risultati
  // const [error, setError] = useState(false);
  // const [savedIDs, setSavedIDs] = useState([]);

  const data = useSelector(state => state.bookReducer.booksData);
  const savedIDs = useSelector(state => state.bookReducer.savedIDs);
  const error = useSelector(state => state.bookReducer.error);
  const loading = useSelector(state => state.bookReducer.loading);

  // console.log('dati da redux', data);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSavedBooksIDs())
  // }, [])

  // stateful component => componenti che hanno lo state e lo gestiscono
  // satteless component => componenti senza state

  const handleInput = (e) => {
    setInputText(e.target.value)
  }

  // prendere dari dei libri cercati dall'utente
  const fetchData = () => {
    // try {
    //   if (inputText.trim() === '') { //.trim() seve a togliere gli spazi vuoti all'inizio e alla fine quindi la ricerca di spazio-spazio-spazio non dara' risultato
    //   return
    // }
    // await setLoading(true); //settiamo true per mostrare il caricamento
    // const myData = await googleBooks.get(`?q=${inputText}`);
    // console.log(myData);
    // await setData(myData.data);
    // await dispatch(getSavedBooksIDs());
    dispatch(fetchBookData(inputText));
    // await setLoading(false); //settiamo false subito dopo che son caricati i dati
    // setError(false)
  //   } catch (error) {
  //     console.log(error);
  //     // setLoading(false);
  //     // setError(true);
  //   }   
  }

  // useEffect(fetchData, []);

  // prendere gli id dei libri salvati
//   const getSavedBooksID = async () => {
//     try {
//         const response = await firebase.get('booksData.json');
//         const data = response.data;
//         // console.log('data da firebase', data);
//         const allIDs = [];
//         for (let key in data) {
//             allIDs.push(data[key].bookId);
//         }

//         await setSavedIDs(allIDs);
//         // console.log('id salvati', savedIDs);

//     } catch (error) {
//         console.log(error);
//     }
// }

// aggiungere libri
const addBook = async (doesExist, id, title) => {
  if (doesExist) {
      alert('libro salvato in precedenza')
      return
  }
  dispatch(addNewBook(id, title));
  // setLoading(true);
  // try {
  //     const data = await firebase.post("booksData.json", {
  //     bookId: id,
  //     bookTitle: title,
  // });
  // await dispatch(getSavedBooksIDs());
  // console.log(data);
  // setLoading(false);
  // setError(false);
  // } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     setError(true);
  // }
};

  const showResults = () => {
    if (data.totalItems === 0) {
      return <Message error={true} text='Ricerca senza risultati' />
    } else if (data.length === 0) {
      return <Message text='Cerca qualcosa...' />
    } else {
      return error ? (
      <Message message='ERRORE DI NETWORK' error />
      ) : loading ? (
      <Message text='Sta caricando...' />
      ) : (<Results loading={loading} error={error} addBook={addBook} savedIDs={savedIDs} data={data} />)
      // se non da nessuno degli errori precedenti mostraimo quel paragrafo prima che carichi i risultati
    }
  }

  return (
    <div>
      <div className={styles.inputContainer}>
            <h2>Cerca un libro</h2>
            <div style={{display:'flex'}}>
              <input value={inputText} onChange={handleInput} type="text" />
              <button onClick={fetchData}>Cerca</button>
            </div>
        </div>
      {/* errore dei dati inesistenti quando si refresha la pagina */}
      {/* {data.length === 0 ? <p>cerca qualcosa...</p> : <Results data={data} />} */}
      <div>
        <h2 style={{paddingLeft: '30px'}}>Risultati</h2>
        {showResults()}
      </div>
    </div>
  );
}

export default App;
