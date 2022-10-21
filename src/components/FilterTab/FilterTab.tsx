import React, { useState } from 'react';
import { FilterOption, WordType } from '../../app/helpers/enums';
import FilterButton from './FilterButton';

type Props = {
    filterWords: (type: FilterOption) => void;
};

const FilterTab: React.FC<Props> = ({ filterWords }) => {
    const [selectedFilter, setSelectedFilter] = useState('nouns');

    const handleSelectedFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedFilter(e.currentTarget.id);
        filterWords(Number(e.currentTarget.dataset.type));
    };

    return (
        <div className='container'>
            <div className='filter-tab'>
                <FilterButton
                    id='nouns'
                    text='Nouns'
                    type={FilterOption.Noun}
                    isSelected={selectedFilter === 'nouns'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='verbs'
                    text='Verbs'
                    type={FilterOption.Verb}
                    isSelected={selectedFilter === 'verbs'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='mistakes'
                    text='Mistakes'
                    type={FilterOption.Mistake}
                    isSelected={selectedFilter === 'mistakes'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='all'
                    text='All'
                    type={FilterOption.All}
                    isSelected={selectedFilter === 'all'}
                    onSelect={handleSelectedFilter}
                />
            </div>
        </div>
    );
};

export default FilterTab;
