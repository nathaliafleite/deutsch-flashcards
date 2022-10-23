import { useContext, useState } from 'react';
import { FilterOptionEnum, WordTypeEnum } from '../../app/helpers/enums';
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
        nounIndex: 0,
        verbIndex: 0,
        mistakeIndex: 0,
        allIndex: 0,
    });

    const handleNounIndex = () => {
        const lastIndex = curCard.nounIndex === wordsCtx.nouns.length - 1;
        setCurCard(prevState => {
            return {
                ...prevState,
                nounIndex: lastIndex ? 0 : prevState.nounIndex + 1,
            };
        });
    };

    const handleVerbIndex = () => {
        const lastIndex = curCard.verbIndex === wordsCtx.verbs.length - 1;
        setCurCard(prevState => {
            return {
                ...prevState,
                verbIndex: lastIndex ? 0 : prevState.verbIndex + 1,
            };
        });
    };

    const handleMistakeIndex = (increase?: boolean) => {
        const lastIndex = curCard.mistakeIndex >= wordsCtx.mistakes.length - 1;
        if (increase) {
            setCurCard(prevState => {
                return {
                    ...prevState,
                    mistakeIndex: lastIndex ? 0 : prevState.mistakeIndex + 1,
                };
            });
        } else {
            setCurCard(prevState => {
                return {
                    ...prevState,
                    mistakeIndex: lastIndex ? 0 : prevState.mistakeIndex,
                };
            });
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
            wordsCtx.removeMistake(wordsCtx.mistakes[curCard.mistakeIndex]);
            handleMistakeIndex();
        }
    };

    const handleWrongAnswer = () => {
        handleFlip(false);

        if (filter === FilterOptionEnum.Noun) {
            wordsCtx.addMistakes(wordsCtx.nouns[curCard.nounIndex].id);
            handleNounIndex();
        }

        if (filter === FilterOptionEnum.Verb) {
            wordsCtx.addMistakes(wordsCtx.verbs[curCard.verbIndex].id);
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
