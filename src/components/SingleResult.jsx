import styles from '../style/SingleResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';


const SingleResult = ({title, thumbnail, id, doesExist, addBook, loading, error}) => {
    
    // console.log('esiste?', doesExist);

    // const addBook = () => {
    //     setLoading(true);
    //     setError(false);
    //     // aggiungere libro al nostro database... axios.post inserisce i dati in quel link-database/nome-insieme-di-dati.json
    //     axios.post('https://booktakeaway-5c7b3-default-rtdb.firebaseio.com/booksData.json', {
    //         bookId: id
    //     }).then(response => {
    //         console.log(response);
    //         setLoading(false);
    //         setError(false);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         setLoading(false);
    //         setError(true);
    //     }); //essendo una richiesta http ha bisogno della risposta
    // }

    const buttonColor = doesExist ? 'grey' : 'green';
    const cursor = doesExist ? 'not-allowed' : 'pointer';
    const myTitle = title.slice(0, 50);
    return (
        <div className={styles.container}>
            <div style={{padding: '5px', height: '80px'}}>
                <Link state={{bookKey: id}} to={`book/${id}`}>
                   <p>{myTitle}</p>
                </Link>
            </div>
            <img src={thumbnail} alt="" style={{maxHeight: '200px'}}/>
            {loading ? (
                <Spinner />
            ) : (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FontAwesomeIcon onClick={() => addBook(doesExist, id, title)} 
                    style={{marginTop : '20px', cursor: cursor, color: buttonColor}} 
                    size='2x' icon={faPlusSquare} />
                    {error ? <p>errore di network</p> : null}
                </div>
                
            )}
        </div>
    )
}

export default SingleResult;