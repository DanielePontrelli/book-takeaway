import styles from '../style/SingleChapter.module.css';
import {Link} from 'react-router-dom';

const SingleChapter = ({number, bookID, bookName, chapterKey, bookKey}) => {

    return (
        <Link className={styles.container} 
        state={{
          libro: bookName, 
          capitolo: number, 
          chapterKey: chapterKey,
          bookKey: bookKey
        }} 
        to={{pathname: `/book/${bookID}/chapter/${number}`}}> 
        {/*cosi' si possono passare i dati tramite il link  */}
          <div>
            <p>Capitolo {number}</p>
          </div>
        </Link>
    )
}

export default SingleChapter;