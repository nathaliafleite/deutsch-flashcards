import { Verb } from '../../app/helpers/types';

type Props = {
    data: Verb;
    flip: boolean;
    handleFlip: () => void;
};

const FlashcardVerb: React.FC<Props> = ({ data, flip, handleFlip }) => {
    const { word, infinitive, perfect, present3rd, preterite } = data;

    return (
        <div className='container'>
            <div className={`flashcard ${flip ? 'flip' : ''}`} onClick={handleFlip}>
                <div className='flashcard--front'>
                    <h1 className='flashcard__word'>{word}</h1>
                </div>
                <div className='flashcard--back verb'>
                    <div className='flashcard__header mb-11'>
                        <h1>{infinitive}</h1>
                        <h2>{present3rd}</h2>
                    </div>
                    <div>
                        <div className='flashcard__footer'>
                            <p className='left verb'>preterite</p>
                            <div className='right'>
                                <p className='small'>{preterite}</p>
                            </div>
                        </div>
                        <div className='flashcard__footer'>
                            <p className='left verb'>perfect</p>
                            <div className='right'>
                                <p className='small'>{perfect}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardVerb;
