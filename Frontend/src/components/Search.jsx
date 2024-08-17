import React from 'react'
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onPropChange }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value)

    
    onPropChange(search);
  } 

  return (
    <div className='container-xl lg:container m-auto'>
      <form onSubmit={handleChange} className='flex gap-3'>
        <input
          type="text"
          id="search"
          name="title"
          className="border rounded py-3 px-3 flex-1"
          placeholder="eg. React developer"
          value = {search}
          onChange={handleChange}
        />
        <button
          className="bg-indigo-500 hover:bg-indigo-600 h-12 w-12 rounded-full focus:outline-none focus:shadow-outline flex justify-center items-center"
        >
          <FaSearch />
        </button>      
      </form>
    </div>
  )
}

export default Search