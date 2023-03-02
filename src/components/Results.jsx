import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';


// const fakeData = [
//     {title: 'libro 1', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
//     {title: 'libro 2', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
//     {title: 'libro 3', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
//     {title: 'libro 4', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
//     {title: 'libro 5', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
//     {title: 'libro 6', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, similique.'},
// ]

const Results = ({data, savedIDs, addBook}) => { 

    // 1. Prendere Id dei libri salvati da firebase
    // 2. prendere id dei libri cercati dall' utente
    // 3. confrontarli

    const renderElement = () => {
        // console.log('dati da results.js', data.items);
        const myData = data.items;
        return myData.map((book) => {
            const doesExist = savedIDs.includes(book.id);
            return (
                <SingleResult 
                key={book.id}
                id={book.id} 
                addBook={addBook}
                doesExist={doesExist}
                title={book.volumeInfo.title} 
                thumbnail={book.volumeInfo.imageLinks.thumbnail} 
                description={book.volumeInfo.description} />
            );
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.resultsContainer}>
                {renderElement()}
            </div>     
        </div>
    )
}

export default Results;