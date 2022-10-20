import { WordType } from '../../app/enums';
import SearchCard from '../../components/SearchCard/SearchCard';

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

function SearchResultList() {
    return <SearchCard type={WordType.Noun} dataNoun={DUMMY_NOUN} />;
}

export default SearchResultList;
