import React, { useState } from "react";
import { FilterOptionEnum } from "../../app/helpers/enums";
import FilterButton from "./FilterButton";

type Props = {
  filterWords: (type: FilterOptionEnum) => void;
};

const FilterTab: React.FC<Props> = ({ filterWords }) => {
  const [selectedFilter, setSelectedFilter] = useState("nouns");

  const handleSelectedFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedFilter(e.currentTarget.id);
    filterWords(Number(e.currentTarget.dataset.type));
  };

  return (
    <div className="container">
      <div className="filter-tab">
        <FilterButton
          id="nouns"
          text="Nouns"
          type={FilterOptionEnum.Noun}
          isSelected={selectedFilter === "nouns"}
          onSelect={handleSelectedFilter}
        />
        <FilterButton
          id="verbs"
          text="Verbs"
          type={FilterOptionEnum.Verb}
          isSelected={selectedFilter === "verbs"}
          onSelect={handleSelectedFilter}
        />
        <FilterButton
          id="adjectives"
          text="Adjectives"
          type={FilterOptionEnum.Adjective}
          isSelected={selectedFilter === "adjectives"}
          onSelect={handleSelectedFilter}
        />
        <FilterButton
          id="mistakes"
          text="Mistakes"
          type={FilterOptionEnum.Mistake}
          isSelected={selectedFilter === "mistakes"}
          onSelect={handleSelectedFilter}
        />
        {/* <FilterButton
          id="all"
          text="All"
          type={FilterOptionEnum.All}
          isSelected={selectedFilter === "all"}
          onSelect={handleSelectedFilter}
        /> */}
      </div>
    </div>
  );
};

export default FilterTab;
