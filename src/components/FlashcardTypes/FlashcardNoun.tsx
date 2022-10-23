import { Noun } from '../../app/helpers/types';

type Props = {
    data: Noun;
    flip: boolean;
    handleFlip: () => void;
};

const FlashcardNoun: React.FC<Props> = ({ data, flip, handleFlip }) => {
    const { gender, word, nominative, accusative, dative, genitive } = data;

    return (
        <div className='container'>
            <div className={`flashcard ${flip ? 'flip' : ''}`} onClick={handleFlip}>
                <div className='flashcard--front'>
                    <h1 className='flashcard__word'>{word}</h1>
                </div>
                <div className={`flashcard--back ${gender}`}>
                    <div className='flashcard__header mb-11'>
                        <h1>{nominative.singular}</h1>
                        <h2>{nominative.plural}</h2>
                    </div>
                    <div>
                        <div className='flashcard__footer'>
                            <p className='left '>akk.</p>
                            <div className='right'>
                                <p className='small'>{accusative.singular}</p>
                                <p className='small'>{accusative.plural}</p>
                            </div>
                        </div>
                        <div className='flashcard__footer'>
                            <p className='left'>dat.</p>
                            <div className='right'>
                                <p className='small'>{dative.singular}</p>
                                <p className='small'>{dative.plural}</p>
                            </div>
                        </div>
                        <div className='flashcard__footer'>
                            <p className='left'>gen.</p>
                            <div className='right'>
                                <p className='small'>{genitive.singular}</p>
                                <p className='small'>{genitive.plural}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardNoun;
