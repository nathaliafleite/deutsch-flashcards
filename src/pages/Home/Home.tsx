import { useState } from 'react';
import { FilterOptionEnum } from '../../app/helpers/enums';
import FilterTab from '../../components/FilterTab/FilterTab';
import FlashcardList from './FlashcardList';

function Home() {
  const [filter, setFilter] = useState<FilterOptionEnum>(FilterOptionEnum.Noun);
  const [flip, setFlip] = useState(false);

  const handleWordsFilter = (filter: FilterOptionEnum) => {
    setFilter(filter);
    setFlip(false);
  };

  return (
    <>
      <FilterTab filterWords={handleWordsFilter} />
      <FlashcardList filter={filter} flip={flip} handleFlip={flip => setFlip(flip)} />
    </>
  );
}

export default Home;
