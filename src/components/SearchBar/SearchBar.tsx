import React, { useRef } from 'react';
import SearchIcon from '../svgs/SearchIcon';

function SearchBar() {
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(searchRef.current?.value);
    };

    return (
        <div className='container'>
            <form className='search-bar' onSubmit={handleSearchSubmit}>
                <input ref={searchRef} placeholder='Search...' />
                <button type='submit' className='search-button'>
                    <SearchIcon />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
