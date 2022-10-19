import React, { useState } from 'react';
import FilterButton from './FilterButton';

function FilterTab() {
    const [selectedFilter, setSelectedFilter] = useState('nouns');

    const handleSelectedFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedFilter(e.currentTarget.id);
    };

    return (
        <div className='container'>
            <div className='filter-tab'>
                <FilterButton
                    id='nouns'
                    text='Nouns'
                    isSelected={selectedFilter === 'nouns'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='verbs'
                    text='Verbs'
                    isSelected={selectedFilter === 'verbs'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='mistakes'
                    text='Mistakes'
                    isSelected={selectedFilter === 'mistakes'}
                    onSelect={handleSelectedFilter}
                />
                <FilterButton
                    id='all'
                    text='All'
                    isSelected={selectedFilter === 'all'}
                    onSelect={handleSelectedFilter}
                />
            </div>
        </div>
    );
}

export default FilterTab;
