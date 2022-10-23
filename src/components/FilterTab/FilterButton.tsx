import React from 'react';
import { FilterOptionEnum } from '../../app/helpers/enums';

type Props = {
    isSelected: boolean;
    id: string;
    text: string;
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: FilterOptionEnum;
};

const FilterButton: React.FC<Props> = ({ isSelected, id, text, onSelect, type }) => {
    return (
        <button
            type='button'
            id={id}
            className={`filter-button ${isSelected ? 'active' : ''}`}
            onClick={onSelect}
            data-type={type}
        >
            {text}
        </button>
    );
};

export default FilterButton;
