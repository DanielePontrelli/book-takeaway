import Home from './pages/Home';
import Book from './pages/Book';
import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import SavedBooks from './pages/SavedBooks';
import BookChapter from './pages/BookChapter';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Routes invece di switch */}
        <Route exact path="/" element={<Home />} />
          {/* path="/" sarebbe la pagina che vogliamo come home */}
        <Route exact path ="/book/:id" element={<Book />}/>
          {/* invece /book viene indirizzata a un altra pagina */}
        <Route exact path ="/savedbooks" element={<SavedBooks />}/>
        <Route exact path="/book/:id/chapter/:number" element={<BookChapter />}/>
      </Routes>
    </div>
  );
}

export default App;