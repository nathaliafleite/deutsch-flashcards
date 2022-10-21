import './App.scss';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home/Home';
import SearchResultDetail from './pages/Search/SearchResultDetail';
import Search from './pages/Search/Search';
import { WORDS_URL } from './app/constants';
import Loading from './components/Loading/Loading';
import { useContext, useEffect, useState } from 'react';
import { WordsContext } from './app/store/words-context';
import { getRequest, shuffleArray } from './app/helpers/services';

function App() {
    const wordsCtx = useContext(WordsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const init = async () => {
            const response = await getRequest(WORDS_URL);
            if (!response) setError(true);
            else {
                wordsCtx.addNouns(shuffleArray(response.nouns));
                wordsCtx.addVerbs(shuffleArray(response.verbs));
            }
            setLoading(false);
        };

        init();
    }, []);

    return (
        <>
            {loading && <Loading extraClass='height-86vh' />}
            {!loading && !error && (
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
