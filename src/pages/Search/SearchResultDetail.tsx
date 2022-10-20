import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/Buttons/BackButton';
import FlashcardNoun from '../../components/FlashcardTypes/FlashcardNoun';

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

function SearchResultDetail() {
    const { id } = useParams();
    const [flip, setFlip] = useState(true);

    return (
        <>
            <FlashcardNoun
                data={DUMMY_NOUN}
                flip={flip}
                handleFlip={() => setFlip(!flip)}
            />
            <BackButton />
        </>
    );
}

export default SearchResultDetail;
