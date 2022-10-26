import { useContext, useState } from 'react';
import {
    STORAGE_MISTAKES,
    STORAGE_MISTAKES_INDEX,
    STORAGE_NOUNS,
    STORAGE_NOUNS_INDEX,
    STORAGE_VERBS,
    STORAGE_VERBS_INDEX,
} from '../../app/constants';
import { FilterOptionEnum, WordTypeEnum } from '../../app/helpers/enums';
import {
    getLocalStorageItem,
    setLocalStorageItem,
} from '../../app/helpers/locarlStorage';
import { shuffleArray } from '../../app/helpers/services';
import { WordsContext } from '../../app/store/words-context';
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
    mistakeIndex: number;
    allIndex: number;
};

const FlashcardList: React.FC<Props> = ({ filter, flip, handleFlip }) => {
    const wordsCtx = useContext(WordsContext);
    const [curCard, setCurCard] = useState<CurrentFlashcard>({
        type: WordTypeEnum.Noun,
        nounIndex: wordsCtx.nounsIndex,
        verbIndex: wordsCtx.verbsIndex,
        mistakeIndex: wordsCtx.mistakesIndex,
        allIndex: 0,
    });

    const handleNounIndex = () => {
        const lastIndex = curCard.nounIndex === wordsCtx.nouns.length - 1;

        if (lastIndex) {
            const newNounsArr = shuffleArray(wordsCtx.nouns);
            wordsCtx.setContextNouns(newNounsArr);
            setLocalStorageItem(
                { key: STORAGE_NOUNS_INDEX, value: 0 },
                { key: STORAGE_NOUNS, value: newNounsArr }
            );
            setCurCard(prevState => {
                return {
                    ...prevState,
                    nounIndex: 0,
                };
            });
        } else {
            setLocalStorageItem({
                key: STORAGE_NOUNS_INDEX,
                value: curCard.nounIndex + 1,
            });
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
            setLocalStorageItem(
                { key: STORAGE_VERBS_INDEX, value: 0 },
                { key: STORAGE_VERBS, value: newVerbsArr }
            );
            setCurCard(prevState => {
                return {
                    ...prevState,
                    verbIndex: 0,
                };
            });
        } else {
            setLocalStorageItem({
                key: STORAGE_VERBS_INDEX,
                value: curCard.verbIndex + 1,
            });
            setCurCard(prevState => {
                return {
                    ...prevState,
                    verbIndex: prevState.verbIndex + 1,
                };
            });
        }
    };

    const handleMistakeIndex = (increase?: boolean) => {
        const lastIndex = curCard.mistakeIndex >= wordsCtx.mistakes.length - 1;

        if (lastIndex) {
            const newMistakesArr = shuffleArray(wordsCtx.mistakes);
            wordsCtx.setContextMistakes(newMistakesArr);
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

        if (filter === FilterOptionEnum.Mistake) {
            const lastMistake = wordsCtx.mistakes.length === 1;
            if (lastMistake) {
                wordsCtx.setContextMistakes([]);
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
                        (mistakeId: string) =>
                            mistakeId !== wordsCtx.mistakes[curCard.mistakeIndex]
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
                />
            )}

            {filter === FilterOptionEnum.Verb && (
                <FlashcardVerb
                    data={wordsCtx.verbs[curCard.verbIndex]}
                    flip={flip}
                    handleFlip={() => handleFlip(!flip)}
                />
            )}

            {filter === FilterOptionEnum.Mistake && (
                <FlashcardMistake
                    index={curCard.mistakeIndex}
                    flip={flip}
                    handleFlip={() => handleFlip(!flip)}
                />
            )}

            <div className='container'>
                {flip && (
                    <div className='flex flex-ac flex-jsb mt-7'>
                        <button
                            type='button'
                            className='clear-button'
                            onClick={handleWrongAnswer}
                        >
                            I was wrong
                        </button>
                        <button
                            type='button'
                            className='clear-button'
                            onClick={handleRightAnswer}
                        >
                            I was right
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default FlashcardList;
