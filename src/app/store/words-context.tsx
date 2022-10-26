import React, { createContext, useState } from 'react';
import {
    STORAGE_MISTAKES_INDEX,
    STORAGE_NOUNS_INDEX,
    STORAGE_VERBS_INDEX,
} from '../constants';
import { getLocalStorageItem } from '../helpers/locarlStorage';
import { Noun, Verb } from '../helpers/types';

type WordsContextType = {
    nouns: Noun[];
    verbs: Verb[];
    mistakes: string[];
    setContextNouns: (data: Noun[]) => void;
    setContextVerbs: (data: Verb[]) => void;
    setContextMistakes: (data: string[]) => void;
    addMistake: (data: string) => void;
    removeMistake: (data: string) => void;
    nounsIndex: number;
    verbsIndex: number;
    mistakesIndex: number;
};

export const WordsContext = createContext<WordsContextType>({
    nouns: [],
    verbs: [],
    mistakes: [],
    setContextNouns: (data: Noun[]) => {},
    setContextVerbs: (data: Verb[]) => {},
    setContextMistakes: (data: string[]) => {},
    addMistake: (data: string) => {},
    removeMistake: (data: string) => {},
    nounsIndex: 0,
    verbsIndex: 0,
    mistakesIndex: 0,
});

type Props = {
    children: React.ReactNode;
};

const WordsContextProvider: React.FC<Props> = ({ children }) => {
    const [nouns, setNouns] = useState<Noun[]>([]);
    const [verbs, setVerbs] = useState<Verb[]>([]);
    const [mistakes, setMistakes] = useState<string[]>([]);
    const [nounsIndex, setNounsIndex] = useState(0);
    const [verbsIndex, setVerbsIndex] = useState(0);
    const [mistakesIndex, setMistakesIndex] = useState(0);

    const setContextNounsHandler = (nounsArr: Noun[]) => {
        setNouns(nounsArr);
        setNounsIndex(getLocalStorageItem(STORAGE_NOUNS_INDEX) || 0);
    };

    const setContextVerbsHandler = (verbsArr: Verb[]) => {
        setVerbs(verbsArr);
        setVerbsIndex(getLocalStorageItem(STORAGE_VERBS_INDEX) || 0);
    };

    const setContextMistakesHandler = (mistakesArr: string[]) => {
        setMistakes(mistakesArr);
        setMistakesIndex(getLocalStorageItem(STORAGE_MISTAKES_INDEX) || 0);
    };

    const addMistakeHandler = (id: string) => {
        setMistakes(prevState => {
            return prevState.concat(id);
        });
    };

    const removeMistakesHandler = (id: string) => {
        setMistakes(prevState => {
            return prevState.filter(mistakeId => mistakeId !== id);
        });
    };

    const contextValue: WordsContextType = {
        nouns: nouns,
        verbs: verbs,
        mistakes: mistakes,
        setContextNouns: setContextNounsHandler,
        setContextVerbs: setContextVerbsHandler,
        setContextMistakes: setContextMistakesHandler,
        addMistake: addMistakeHandler,
        removeMistake: removeMistakesHandler,
        nounsIndex: nounsIndex,
        verbsIndex: verbsIndex,
        mistakesIndex: mistakesIndex,
    };

    return (
        <WordsContext.Provider value={contextValue}>{children}</WordsContext.Provider>
    );
};

export default WordsContextProvider;
