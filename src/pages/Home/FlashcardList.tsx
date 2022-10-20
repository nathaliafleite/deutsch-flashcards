import { useState } from 'react';
import FlashcardNoun from '../../components/FlashcardTypes/FlashcardNoun';

function FlashcardList() {
    const [flip, setFlip] = useState(false);

    const DUMMY_NOUN = {
        id: 'noun-1',
        accusative: {
            plural: 'die Garagen',
            singular: 'die Garage',
        },
        dative: {
            plural: 'den Garagen',
            singular: 'der Garage',
        },
        gender: 'F',

        genitive: {
            plural: 'der Garagen',
            singular: 'der Garage',
        },
        nominative: {
            plural: 'die Garagen',
            singular: 'die Garage',
        },
        word: 'Garagem',
    };

    return (
        <>
            <FlashcardNoun
                data={DUMMY_NOUN}
                flip={flip}
                handleFlip={() => setFlip(!flip)}
            />
            <div className='container'>
                {flip && (
                    <div className='flex flex-ac flex-jsb mt-7'>
                        <button type='button' className='clear-button'>
                            I was wrong
                        </button>
                        <button type='button' className='clear-button'>
                            I was right
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default FlashcardList;
