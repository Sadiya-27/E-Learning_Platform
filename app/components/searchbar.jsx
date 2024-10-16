import React, { useState } from 'react';
import Image from 'next/image'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Call API or perform search logic here
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <form className='flex flex-wrap w-2/3  '>
        <input
            className='flex flex-wrap border border-slate-200 mr-3 w-2/3 rounded-md shadow-md focus:ring-indigo-600 focus:border-indigo-600'
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Explore Courses..."
        />
        <button type="submit" onClick={handleSearch} className='bg-indigo-600 rounded-full justify-center items-center hover:bg-indigo-500'>
            <Image src='/searchicon.png' alt='search' width={50} height={30} className='p-1'/>
        </button>
        </form>
    );
};

export default SearchBar;