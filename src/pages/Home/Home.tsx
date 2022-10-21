import { useState } from 'react';
import { FilterOption, WordType } from '../../app/helpers/enums';
import FilterTab from '../../components/FilterTab/FilterTab';
import FlashcardList from './FlashcardList';

function Home() {
    const [type, setType] = useState<FilterOption>(FilterOption.Noun);

    const handleWordsFilter = (type: FilterOption) => {
        setType(type);
    };
    return (
        <>
            <FilterTab filterWords={handleWordsFilter} />
            <FlashcardList type={type} />
        </>
    );
}

export default Home;
