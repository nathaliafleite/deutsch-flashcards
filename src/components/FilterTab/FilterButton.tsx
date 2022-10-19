import React from 'react';

type Props = {
    isSelected: boolean;
    id: string;
    text: string;
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const FilterButton: React.FC<Props> = ({ isSelected, id, text, onSelect }) => {
    return (
        <button
            type='button'
            id={id}
            className={`filter-button ${isSelected ? 'active' : ''}`}
            onClick={onSelect}
        >
            {text}
        </button>
    );
};

export default FilterButton;
