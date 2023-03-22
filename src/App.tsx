import "./App.scss";
import { Route, Routes } from "react-router-dom";
import SearchBar from "./components/SearchBar/SearchBar";
import Home from "./pages/Home/Home";
import SearchResultDetail from "./pages/Search/SearchResultDetail";
import Search from "./pages/Search/Search";
import {
  STORAGE_ANSWERED_NOUNS,
  STORAGE_ANSWERED_VERBS,
  STORAGE_ANSWERED_ADJECTIVES,
  STORAGE_MISTAKES,
  STORAGE_MISTAKES_INDEX,
  WORDS_URL,
} from "./app/constants";
import Loading from "./components/Loading/Loading";
import { useContext, useEffect, useState } from "react";
import { WordsContext } from "./app/store/words-context";
import { getRequest, shuffleArray } from "./app/helpers/services";
import { getLocalStorageItem, setLocalStorageItem } from "./app/helpers/locarlStorage";
import { Adjective, Noun, Verb } from "./app/helpers/types";

function App() {
  const wordsCtx = useContext(WordsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const init = async () => {
      const answeredNounsIds = getLocalStorageItem(STORAGE_ANSWERED_NOUNS) || [];
      const answeredVerbsIds = getLocalStorageItem(STORAGE_ANSWERED_VERBS) || [];
      const answeredAdjectivesIds =
        getLocalStorageItem(STORAGE_ANSWERED_ADJECTIVES) || [];
      const mistakes = getLocalStorageItem(STORAGE_MISTAKES) || [];
      const mistakeIndex = getLocalStorageItem(STORAGE_MISTAKES_INDEX) || 0;

      let nouns: Noun[];
      let verbs: Verb[];
      let adjectives: Adjective[];
      let nounsIndex: number;
      let verbsIndex: number;
      let adjectivesIndex: number;
      const response = await getRequest(WORDS_URL);

      if (!response) setError(true);

      if (answeredNounsIds.length === 0) {
        nouns = shuffleArray(response.nouns);
        nounsIndex = 0;
      } else {
        const unansweredNouns = response.nouns.filter(
          (data: Noun) => !answeredNounsIds.includes(data.id)
        );
        const shuffledUnansweredNouns = shuffleArray(unansweredNouns);
        const answeredNouns = response.nouns.filter((data: Noun) =>
          answeredNounsIds?.includes(data.id)
        );
        nouns = [...answeredNouns, ...shuffledUnansweredNouns];
        nounsIndex = answeredNouns.length;
      }

      if (answeredVerbsIds.length === 0) {
        verbs = shuffleArray(response.verbs);
        verbsIndex = 0;
      } else {
        const unansweredVerbs = response.verbs.filter(
          (data: Verb) => !answeredVerbsIds.includes(data.id)
        );
        const shuffledUnansweredVerbs = shuffleArray(unansweredVerbs);
        const answeredVerbs = response.verbs.filter((data: Verb) =>
          answeredVerbsIds?.includes(data.id)
        );

        verbs = [...answeredVerbs, ...shuffledUnansweredVerbs];
        verbsIndex = answeredVerbs.length;
      }

      if (answeredAdjectivesIds.length === 0) {
        adjectives = shuffleArray(response.adjectives);
        adjectivesIndex = 0;
      } else {
        const unansweredAdjectives = response.adjectives.filter(
          (data: Adjective) => !answeredAdjectivesIds.includes(data.id)
        );
        const shuffledUnansweredAdjectives = shuffleArray(unansweredAdjectives);
        const answeredAdjectives = response.adjectives.filter((data: Adjective) =>
          answeredAdjectivesIds?.includes(data.id)
        );

        adjectives = [...answeredAdjectives, ...shuffledUnansweredAdjectives];
        adjectivesIndex = answeredAdjectives.length;
      }

      wordsCtx.setContextNouns(nouns);
      wordsCtx.setNounsIndex(nounsIndex);
      wordsCtx.setContextVerbs(verbs);
      wordsCtx.setVerbsIndex(verbsIndex);
      wordsCtx.setContextAdjectives(adjectives);
      wordsCtx.setAdjectivesIndex(adjectivesIndex);
      wordsCtx.setContextMistakes(mistakes);
      wordsCtx.setMistakesIndex(mistakeIndex);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <>
      {loading && <Loading extraClass="height-86vh" />}
      {!loading && !error && (
        <>
          {/* <SearchBar /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="search/:id" element={<SearchResultDetail />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
