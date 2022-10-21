import './App.scss';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home/Home';
import SearchResultDetail from './pages/Search/SearchResultDetail';
import Search from './pages/Search/Search';
import useFetch from './app/hooks/useFetch';
import { WORDS_URL } from './app/constants';
import Loading from './components/Loading/Loading';

function App() {
    const { data, loading, error } = useFetch(WORDS_URL);

    return (
        <>
            {loading && <Loading extraClass='height-86vh' />}
            {data && (
                <>
                    <SearchBar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='search' element={<Search />} />
                        <Route path='search/:id' element={<SearchResultDetail />} />
                    </Routes>
                </>
            )}
        </>
    );
}

export default App;
