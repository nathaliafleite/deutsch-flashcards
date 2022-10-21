import { useContext, useState } from 'react';
import { FilterOption } from '../../app/helpers/enums';
import { WordsContext } from '../../app/store/words-context';
import FlashcardNoun from '../../components/FlashcardTypes/FlashcardNoun';
import FlashcardVerb from '../../components/FlashcardTypes/FlashcardVerb';

type Props = {
    type: FilterOption;
};

const FlashcardList: React.FC<Props> = ({ type }) => {
    const wordsCtx = useContext(WordsContext);
    const [nounFlip, setNounFlip] = useState(false);
    const [verbFlip, setVerbFlip] = useState(false);
    const [nounIndex, setNounIndex] = useState(0);
    const [verbIndex, setVerbIndex] = useState(0);
    const [mistakeIndex, setMistakeIndex] = useState(0);
    const [allIndex, setAllIndex] = useState(0);

    const cardIsFlipped =
        (type === FilterOption.Noun && nounFlip) ||
        (type === FilterOption.Verb && verbFlip);

    const handleRightAnswer = () => {
        if (type === FilterOption.Noun) {
            setNounFlip(false);
            setNounIndex(prevState => prevState + 1);
        }

        if (type === FilterOption.Verb) {
            setVerbFlip(false);
            setVerbIndex(prevState => prevState + 1);
        }
    };

    const handleWrongAnswer = () => {
        if (type === FilterOption.Noun) {
            wordsCtx.addMistakes(wordsCtx.nouns[nounIndex].id);
            setNounFlip(false);
            setNounIndex(prevState => prevState + 1);
        }

        if (type === FilterOption.Verb) {
            wordsCtx.addMistakes(wordsCtx.verbs[verbIndex].id);
            setVerbFlip(false);
            setVerbIndex(prevState => prevState + 1);
        }
    };

    return (
        <>
            {type === FilterOption.Noun && (
                <FlashcardNoun
                    data={wordsCtx.nouns[nounIndex]}
                    flip={nounFlip}
                    handleFlip={() => setNounFlip(!nounFlip)}
                />
            )}

            {type === FilterOption.Verb && (
                <FlashcardVerb
                    data={wordsCtx.verbs[verbIndex]}
                    flip={verbFlip}
                    handleFlip={() => setVerbFlip(!verbFlip)}
                />
            )}

            <div className='container'>
                {cardIsFlipped && (
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
