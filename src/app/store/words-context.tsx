import React, { createContext, useState } from 'react';
import { Noun, Verb } from '../helpers/types';

type WordsContextType = {
    nouns: Noun[];
    verbs: Verb[];
    mistakes: string[];
    addNouns: (data: Noun[]) => void;
    addVerbs: (data: Verb[]) => void;
    addMistakes: (data: string) => void;
    removeMistake: (data: string) => void;
};

export const WordsContext = createContext<WordsContextType>({
    nouns: [],
    verbs: [],
    mistakes: [],
    addNouns: (data: Noun[]) => {},
    addVerbs: (data: Verb[]) => {},
    addMistakes: (data: string) => {},
    removeMistake: (data: string) => {},
});

type Props = {
    children: React.ReactNode;
};

const WordsContextProvider: React.FC<Props> = ({ children }) => {
    const [nouns, setNouns] = useState<Noun[]>([]);
    const [verbs, setVerbs] = useState<Verb[]>([]);
    const [mistakes, setMistakes] = useState<string[]>([]);

    const addNounsHandler = (nounsArr: Noun[]) => {
        setNouns(nounsArr);
    };

    const addVerbsHandler = (verbsArr: Verb[]) => {
        setVerbs(verbsArr);
    };

    const addMistakesHandler = (id: string) => {
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
        addNouns: addNounsHandler,
        addVerbs: addVerbsHandler,
        addMistakes: addMistakesHandler,
        removeMistake: removeMistakesHandler,
    };

    return (
        <WordsContext.Provider value={contextValue}>{children}</WordsContext.Provider>
    );
};

export default WordsContextProvider;
