import { useContext, useState } from 'react';
import {
  STORAGE_MISTAKES,
  STORAGE_MISTAKES_INDEX,
  STORAGE_ANSWERED_NOUNS,
  STORAGE_ANSWERED_VERBS,
  STORAGE_ANSWERED_ADJECTIVES,
} from '../../app/constants';
import { FilterOptionEnum, WordTypeEnum } from '../../app/helpers/enums';
import {
  clearLocalStorageItem,
  getLocalStorageItem,
  setLocalStorageItem,
} from '../../app/helpers/locarlStorage';
import { shuffleArray } from '../../app/helpers/services';
import { WordsContext } from '../../app/store/words-context';
import FlashcardAdjective from '../../components/FlashcardTypes/FlashcardAdjective';
import FlashcardMistake from '../../components/FlashcardTypes/FlashcardMistake';
import FlashcardNoun from '../../components/FlashcardTypes/FlashcardNoun';
import FlashcardVerb from '../../components/FlashcardTypes/FlashcardVerb';

type Props = {
  filter: FilterOptionEnum;
  flip: boolean;
  handleFlip: (flip: boolean) => void;
};

type CurrentFlashcard = {
  type: WordTypeEnum;
  nounIndex: number;
  verbIndex: number;
  adjectiveIndex: number;
  mistakeIndex: number;
  allIndex: number;
};

const FlashcardList: React.FC<Props> = ({ filter, flip, handleFlip }) => {
  const wordsCtx = useContext(WordsContext);
  const [curCard, setCurCard] = useState<CurrentFlashcard>({
    type: WordTypeEnum.Noun,
    nounIndex: wordsCtx.nounsIndex,
    verbIndex: wordsCtx.verbsIndex,
    adjectiveIndex: wordsCtx.adjectivesIndex,
    mistakeIndex: wordsCtx.mistakesIndex,
    allIndex: 0,
  });

  const handleNounIndex = () => {
    const lastIndex = curCard.nounIndex === wordsCtx.nouns.length - 1;

    if (lastIndex) {
      const newNounsArr = shuffleArray(wordsCtx.nouns);
      wordsCtx.setContextNouns(newNounsArr);
      wordsCtx.setNounsIndex(0);

      clearLocalStorageItem(STORAGE_ANSWERED_NOUNS);

      setCurCard(prevState => {
        return {
          ...prevState,
          nounIndex: 0,
        };
      });
    } else {
      const answeredNounsIds = getLocalStorageItem(STORAGE_ANSWERED_NOUNS) || [];
      const newAnsweredNounsIds = [
        ...answeredNounsIds,
        wordsCtx.nouns[curCard.nounIndex].id,
      ];
      setLocalStorageItem({ key: STORAGE_ANSWERED_NOUNS, value: newAnsweredNounsIds });
      wordsCtx.setNounsIndex(wordsCtx.nounsIndex + 1);
      setCurCard(prevState => {
        return {
          ...prevState,
          nounIndex: prevState.nounIndex + 1,
        };
      });
    }
  };

  const handleVerbIndex = () => {
    const lastIndex = curCard.verbIndex === wordsCtx.verbs.length - 1;

    if (lastIndex) {
      const newVerbsArr = shuffleArray(wordsCtx.verbs);
      wordsCtx.setContextVerbs(newVerbsArr);
      wordsCtx.setVerbsIndex(0);
      clearLocalStorageItem(STORAGE_ANSWERED_VERBS);

      setCurCard(prevState => {
        return {
          ...prevState,
          verbIndex: 0,
        };
      });
    } else {
      const answeredVerbsIds = getLocalStorageItem(STORAGE_ANSWERED_VERBS) || [];
      const newAnsweredVerbsIds = [
        ...answeredVerbsIds,
        wordsCtx.verbs[curCard.verbIndex].id,
      ];
      setLocalStorageItem({ key: STORAGE_ANSWERED_VERBS, value: newAnsweredVerbsIds });
      wordsCtx.setVerbsIndex(wordsCtx.verbsIndex + 1);

      setCurCard(prevState => {
        return {
          ...prevState,
          verbIndex: prevState.verbIndex + 1,
        };
      });
    }
  };

  const handleAdjectiveIndex = () => {
    const lastIndex = curCard.adjectiveIndex === wordsCtx.adjectives.length - 1;

    if (lastIndex) {
      const newAdjectivesArr = shuffleArray(wordsCtx.adjectives);
      wordsCtx.setContextAdjectives(newAdjectivesArr);
      wordsCtx.setAdjectivesIndex(0);
      clearLocalStorageItem(STORAGE_ANSWERED_ADJECTIVES);

      setCurCard(prevState => {
        return {
          ...prevState,
          adjectiveIndex: 0,
        };
      });
    } else {
      const answeredAdjectivesIds =
        getLocalStorageItem(STORAGE_ANSWERED_ADJECTIVES) || [];
      const newAnsweredAdjectivesIds = [
        ...answeredAdjectivesIds,
        wordsCtx.adjectives[curCard.adjectiveIndex].id,
      ];
      setLocalStorageItem({
        key: STORAGE_ANSWERED_ADJECTIVES,
        value: newAnsweredAdjectivesIds,
      });
      wordsCtx.setAdjectivesIndex(wordsCtx.adjectivesIndex + 1);

      setCurCard(prevState => {
        return {
          ...prevState,
          adjectiveIndex: prevState.adjectiveIndex + 1,
        };
      });
    }
  };

  const handleMistakeIndex = (increase?: boolean) => {
    const lastIndex = curCard.mistakeIndex >= wordsCtx.mistakes.length - 1;

    if (lastIndex) {
      const newMistakesArr = shuffleArray(wordsCtx.mistakes);
      wordsCtx.setContextMistakes(newMistakesArr);
      wordsCtx.setMistakesIndex(0);
      setLocalStorageItem(
        { key: STORAGE_MISTAKES, value: newMistakesArr },
        { key: STORAGE_MISTAKES_INDEX, value: 0 }
      );
      setCurCard(prevState => {
        return {
          ...prevState,
          mistakeIndex: 0,
        };
      });
    } else {
      if (increase) {
        wordsCtx.setMistakesIndex(curCard.mistakeIndex + 1);

        setLocalStorageItem({
          key: STORAGE_MISTAKES_INDEX,
          value: curCard.mistakeIndex + 1,
        });
        setCurCard(prevState => {
          return {
            ...prevState,
            mistakeIndex: prevState.mistakeIndex + 1,
          };
        });
      } else {
        setCurCard(prevState => {
          return {
            ...prevState,
            mistakeIndex: prevState.mistakeIndex,
          };
        });
      }
    }
  };

  const handleRightAnswer = () => {
    handleFlip(false);

    if (filter === FilterOptionEnum.Noun) {
      handleNounIndex();
    }

    if (filter === FilterOptionEnum.Verb) {
      handleVerbIndex();
    }

    if (filter === FilterOptionEnum.Adjective) {
      handleAdjectiveIndex();
    }

    if (filter === FilterOptionEnum.Mistake) {
      const lastMistake = wordsCtx.mistakes.length === 1;
      if (lastMistake) {
        wordsCtx.setContextMistakes([]);
        wordsCtx.setMistakesIndex(0);
        setCurCard(prevState => {
          return {
            ...prevState,
            mistakeIndex: 0,
          };
        });
        setLocalStorageItem(
          {
            key: STORAGE_MISTAKES,
            value: [],
          },
          { key: STORAGE_MISTAKES_INDEX, value: 0 }
        );
      } else {
        wordsCtx.removeMistake(wordsCtx.mistakes[curCard.mistakeIndex]);
        setLocalStorageItem({
          key: STORAGE_MISTAKES,
          value: getLocalStorageItem(STORAGE_MISTAKES).filter(
            (mistakeId: string) => mistakeId !== wordsCtx.mistakes[curCard.mistakeIndex]
          ),
        });
        handleMistakeIndex();
      }
    }
  };

  const handleWrongAnswer = () => {
    handleFlip(false);

    if (filter === FilterOptionEnum.Noun) {
      setLocalStorageItem({
        key: STORAGE_MISTAKES,
        value: wordsCtx.mistakes.concat(wordsCtx.nouns[curCard.nounIndex].id),
      });
      wordsCtx.addMistake(wordsCtx.nouns[curCard.nounIndex].id);
      handleNounIndex();
    }

    if (filter === FilterOptionEnum.Verb) {
      setLocalStorageItem({
        key: STORAGE_MISTAKES,
        value: wordsCtx.mistakes.concat(wordsCtx.verbs[curCard.verbIndex].id),
      });
      wordsCtx.addMistake(wordsCtx.verbs[curCard.verbIndex].id);
      handleVerbIndex();
    }

    if (filter === FilterOptionEnum.Adjective) {
      setLocalStorageItem({
        key: STORAGE_MISTAKES,
        value: wordsCtx.mistakes.concat(wordsCtx.adjectives[curCard.adjectiveIndex].id),
      });
      wordsCtx.addMistake(wordsCtx.adjectives[curCard.adjectiveIndex].id);
      handleAdjectiveIndex();
    }

    if (filter === FilterOptionEnum.Mistake) {
      handleMistakeIndex(true);
    }
  };

  return (
    <>
      {filter === FilterOptionEnum.Noun && (
        <FlashcardNoun
          data={wordsCtx.nouns[curCard.nounIndex]}
          flip={flip}
          handleFlip={() => handleFlip(!flip)}
          count={wordsCtx.nouns.length}
          index={curCard.nounIndex}
        />
      )}

      {filter === FilterOptionEnum.Verb && (
        <FlashcardVerb
          data={wordsCtx.verbs[curCard.verbIndex]}
          flip={flip}
          handleFlip={() => handleFlip(!flip)}
          count={wordsCtx.verbs.length}
          index={curCard.verbIndex}
        />
      )}

      {filter === FilterOptionEnum.Adjective && (
        <FlashcardAdjective
          data={wordsCtx.adjectives[curCard.adjectiveIndex]}
          flip={flip}
          handleFlip={() => handleFlip(!flip)}
          count={wordsCtx.adjectives.length}
          index={curCard.adjectiveIndex}
        />
      )}

      {filter === FilterOptionEnum.Mistake && (
        <FlashcardMistake
          index={curCard.mistakeIndex}
          flip={flip}
          handleFlip={() => handleFlip(!flip)}
        />
      )}

      <div className="container">
        <div className="flex flex-ac flex-jsb mt-7">
          <button type="button" className="clear-button" onClick={handleWrongAnswer}>
            Mark as mistake
          </button>
          <button type="button" className="clear-button" onClick={handleRightAnswer}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FlashcardList;
