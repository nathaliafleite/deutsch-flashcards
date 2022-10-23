import { useNavigate } from 'react-router-dom';
import { WordTypeEnum } from '../../app/helpers/enums';
import { Noun, Verb } from '../../app/helpers/types';

type Props = {
    type: WordTypeEnum;
    dataNoun?: Noun;
    dataVerb?: Verb;
};

const SearchCard: React.FC<Props> = ({ type, dataNoun, dataVerb }) => {
    const navigate = useNavigate();

    let word;
    let translation;
    let gender;
    let id: string;

    if (dataNoun && type === WordTypeEnum.Noun) {
        word = dataNoun.word;
        translation = dataNoun.nominative.singular;
        gender = dataNoun.gender;
        id = dataNoun.id;
    }

    if (dataVerb && type === WordTypeEnum.Verb) {
        word = dataVerb.word;
        translation = dataVerb.infinitive;
        id = dataVerb.id;
    }

    return (
        <div className='container'>
            <div className='search-card' onClick={() => navigate(id)}>
                <div className='search-card--left'>
                    <p>{word}</p>
                </div>
                <div className={`search-card--right ${gender ? gender : ''}`}>
                    {translation}
                </div>
            </div>
        </div>
    );
};

export default SearchCard;
