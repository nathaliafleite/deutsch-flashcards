import './App.scss';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home/Home';
import SearchResultDetail from './pages/Search/SearchResultDetail';
import Search from './pages/Search/Search';

function App() {
    return (
        <div>
            <SearchBar />

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='search' element={<Search />} />
                <Route path='search/:id' element={<SearchResultDetail />} />
            </Routes>
        </div>
    );
}

export default App;
