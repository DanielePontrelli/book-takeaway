import { useEffect} from 'react';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {fetchSavedBooks} from '../store/actions/handleBookData';

function SavedBooks() {
  // prendere libri salvati dal database
  // const fakeData= ['harry potter', 'abitudini', 'ciao mondo'];
  // const [bookData, setBookData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  const bookData = useSelector(state => state.bookReducer.savedBooks);
  const loading = useSelector(state => state.bookReducer.loading);
  const error = useSelector(state => state.bookReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedBooks());
  }, []);

  // const fetchBook = async () => {
  //   try {
  //     const response = await firebase.get('booksData.json');
  //     const bookList = [];
  //     for (let key in response.data) {
  //       // console.log('key from savedbook', key)
  //       // aggoingi un oggetto contenente titolo e id nell'array da iterare
  //       // console.log('key:', key);
  //       bookList.push({  
  //         title: response.data[key].bookTitle,
  //         id: response.data[key].bookId,
  //         key: key,
  //       })
  //       // console.log('il mio book list', bookList)
  //     }

  //     // const uniqueValueBooks = [...new Set(bookList.map(JSON.stringify))].map(JSON.parse);
  //     // in sto modo possiamo fare un controllo degli oggetti inclusi nell'array bookList e verificare se vi son doppioni e in caso cancellarli
  //     // console.log('unique Value:', uniqueValueBooks);
  //     setBookData(bookList);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     setError(true);
  //   }
  // }

  const renderBookItem = (book) => {
    return (
      <div key={book.id}
        style={{display: 'flex',justifyContent: 'center', alignItems: 'center', background: '#666', marginBotton: '10px'}}>

        <Link style={{textDecoration: 'none'}} state={{bookKey: book.key}} to={{pathname: `../book/${book.id}`}}>
          <p style={{color: 'white'}}>{book.title}</p>
        </Link>
      </div>
    )
  }

  const renderListBooks = () => {
    return bookData.map((item) => {
      return renderBookItem(item) 
    })
  }
    return (
      <div>
        <h1>I miei libri</h1>
        {error ? (
        <Message message='Errore di Network' error />
        ) : loading ? (
        <Message message="CARICAMENTO..." />
        ) : (renderListBooks())}
      </div>
    )
}

export default SavedBooks;