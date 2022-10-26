import './App.scss';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import Home from './pages/Home/Home';
import SearchResultDetail from './pages/Search/SearchResultDetail';
import Search from './pages/Search/Search';
import {
    STORAGE_MISTAKES,
    STORAGE_MISTAKES_INDEX,
    STORAGE_NOUNS,
    STORAGE_NOUNS_INDEX,
    STORAGE_VERBS,
    STORAGE_VERBS_INDEX,
    WORDS_URL,
} from './app/constants';
import Loading from './components/Loading/Loading';
import { useContext, useEffect, useState } from 'react';
import { WordsContext } from './app/store/words-context';
import { getRequest, shuffleArray } from './app/helpers/services';
import { getLocalStorageItem, setLocalStorageItem } from './app/helpers/locarlStorage';

function App() {
    const wordsCtx = useContext(WordsContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const init = async () => {
            let nouns = getLocalStorageItem(STORAGE_NOUNS);
            let verbs = getLocalStorageItem(STORAGE_VERBS);
            let mistakes = getLocalStorageItem(STORAGE_MISTAKES) || [];
            let nounIndex = getLocalStorageItem(STORAGE_NOUNS_INDEX) || 0;
            let verbIndex = getLocalStorageItem(STORAGE_VERBS_INDEX) || 0;
            let mistakeIndex = getLocalStorageItem(STORAGE_MISTAKES_INDEX) || 0;

            if (!nouns || !verbs) {
                const response = await getRequest(WORDS_URL);
                if (!response) setError(true);
                else {
                    nouns = shuffleArray(response.nouns);
                    verbs = shuffleArray(response.verbs);
                }
            }

            wordsCtx.setContextNouns(nouns);
            wordsCtx.setContextVerbs(verbs);
            wordsCtx.setContextMistakes(mistakes);
            setLocalStorageItem(
                { key: STORAGE_NOUNS, value: nouns },
                { key: STORAGE_VERBS, value: verbs },
                { key: STORAGE_MISTAKES, value: mistakes },
                { key: STORAGE_NOUNS_INDEX, value: nounIndex },
                { key: STORAGE_VERBS_INDEX, value: verbIndex },
                { key: STORAGE_MISTAKES_INDEX, value: mistakeIndex }
            );
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
