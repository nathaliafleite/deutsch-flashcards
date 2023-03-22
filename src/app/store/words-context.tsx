import React, { createContext, useState } from "react";
import { Noun, Verb, Adjective } from "../helpers/types";

type WordsContextType = {
  nouns: Noun[];
  verbs: Verb[];
  adjectives: Adjective[];
  mistakes: string[];
  setContextNouns: (data: Noun[]) => void;
  setContextVerbs: (data: Verb[]) => void;
  setContextAdjectives: (data: Adjective[]) => void;
  setContextMistakes: (data: string[]) => void;
  addMistake: (data: string) => void;
  removeMistake: (data: string) => void;
  nounsIndex: number;
  verbsIndex: number;
  adjectivesIndex: number;
  mistakesIndex: number;
  setNounsIndex: (index: number) => void;
  setVerbsIndex: (index: number) => void;
  setAdjectivesIndex: (index: number) => void;
  setMistakesIndex: (index: number) => void;
};

export const WordsContext = createContext<WordsContextType>({
  nouns: [],
  verbs: [],
  adjectives: [],
  mistakes: [],
  setContextNouns: (data: Noun[]) => {},
  setContextVerbs: (data: Verb[]) => {},
  setContextAdjectives: (data: Adjective[]) => {},
  setContextMistakes: (data: string[]) => {},
  addMistake: (data: string) => {},
  removeMistake: (data: string) => {},
  nounsIndex: 0,
  verbsIndex: 0,
  adjectivesIndex: 0,
  mistakesIndex: 0,
  setNounsIndex: (index: number) => {},
  setVerbsIndex: (index: number) => {},
  setAdjectivesIndex: (index: number) => {},
  setMistakesIndex: (index: number) => {},
});

type Props = {
  children: React.ReactNode;
};

const WordsContextProvider: React.FC<Props> = ({ children }) => {
  const [nouns, setNouns] = useState<Noun[]>([]);
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [adjectives, setAdjectives] = useState<Adjective[]>([]);
  const [mistakes, setMistakes] = useState<string[]>([]);

  const [nounsIndex, setNounsIndex] = useState(0);
  const [verbsIndex, setVerbsIndex] = useState(0);
  const [adjectivesIndex, setAdjectivesIndex] = useState(0);
  const [mistakesIndex, setMistakesIndex] = useState(0);

  const setContextNounsHandler = (nounsArr: Noun[]) => {
    setNouns(nounsArr);
  };

  const setContextVerbsHandler = (verbsArr: Verb[]) => {
    setVerbs(verbsArr);
  };

  const setContextAdjectivesHandler = (adjectivesArr: Adjective[]) => {
    setAdjectives(adjectivesArr);
  };

  const setContextMistakesHandler = (mistakesArr: string[]) => {
    setMistakes(mistakesArr);
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

  const setNounsIndexHandler = (index: number) => {
    setNounsIndex(index);
  };

  const setVerbsIndexHandler = (index: number) => {
    setVerbsIndex(index);
  };

  const setAdjectivesIndexHandler = (index: number) => {
    setAdjectivesIndex(index);
  };

  const setMistakesIndexHandler = (index: number) => {
    setMistakesIndex(index);
  };

  const contextValue: WordsContextType = {
    nouns: nouns,
    verbs: verbs,
    adjectives: adjectives,
    mistakes: mistakes,
    setContextNouns: setContextNounsHandler,
    setContextVerbs: setContextVerbsHandler,
    setContextAdjectives: setContextAdjectivesHandler,
    setContextMistakes: setContextMistakesHandler,
    addMistake: addMistakeHandler,
    removeMistake: removeMistakesHandler,
    nounsIndex: nounsIndex,
    verbsIndex: verbsIndex,
    adjectivesIndex: adjectivesIndex,
    mistakesIndex: mistakesIndex,
    setNounsIndex: setNounsIndexHandler,
    setVerbsIndex: setVerbsIndexHandler,
    setAdjectivesIndex: setAdjectivesIndexHandler,
    setMistakesIndex: setMistakesIndexHandler,
  };

  return <WordsContext.Provider value={contextValue}>{children}</WordsContext.Provider>;
};

export default WordsContextProvider;
