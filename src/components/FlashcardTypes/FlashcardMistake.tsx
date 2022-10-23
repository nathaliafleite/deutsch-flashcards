import { useContext, useEffect, useState } from 'react';
import { WordTypeEnum } from '../../app/helpers/enums';
import { Noun, Verb } from '../../app/helpers/types';
import { WordsContext } from '../../app/store/words-context';
import FlashcardNoun from './FlashcardNoun';
import FlashcardVerb from './FlashcardVerb';

type Props = {
    index: number;
    flip: boolean;
    handleFlip: (flip: boolean) => void;
};

const FlashcardMistake: React.FC<Props> = ({ index, flip, handleFlip }) => {
    const wordsCtx = useContext(WordsContext);
    const [type, setType] = useState<WordTypeEnum | undefined>();
    const [noun, setNoun] = useState<Noun>();
    const [verb, setVerb] = useState<Verb>();

    useEffect(() => {
        if (wordsCtx.mistakes.length > 0) {
            const wordId = wordsCtx.mistakes[index];
            const wordType = wordId.split('-');

            if (wordType[0] === 'noun') {
                setType(WordTypeEnum.Noun);
                setNoun(
                    wordsCtx.nouns.find(noun => noun.id === wordsCtx.mistakes[index])
                );
            }
            if (wordType[0] === 'verb') {
                setType(WordTypeEnum.Verb);
                setVerb(
                    wordsCtx.verbs.find(verb => verb.id === wordsCtx.mistakes[index])
                );
            }
        }
    }, [index, wordsCtx.mistakes]);

    if (wordsCtx.mistakes.length === 0) {
        return (
            <div className='container flex flex-ac flex-jc mt-10'>
                <p>No mistakes yet</p>
            </div>
        );
    }

    return (
        <>
            {type === WordTypeEnum.Noun && noun && (
                <FlashcardNoun
                    data={noun}
                    flip={flip}
                    handleFlip={() => handleFlip(!flip)}
                />
            )}

            {type === WordTypeEnum.Verb && verb && (
                <FlashcardVerb
                    data={verb}
                    flip={flip}
                    handleFlip={() => handleFlip(!flip)}
                />
            )}
        </>
    );
};

export default FlashcardMistake;
