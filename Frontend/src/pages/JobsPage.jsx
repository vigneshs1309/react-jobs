import React, { useState } from 'react'
import JobListings from '../components/JobListings';
import Search from '../components/Search';

const JobsPage = () => {
  const [passSearchtext,setPassSearchtext] = useState('');

  const handlePropChange = (searchValue) => {
    setPassSearchtext(searchValue);
  }


  return (
    <section className='bg-blue-50 py-6'>
      <Search 
      onPropChange = {handlePropChange}
       />
      <JobListings 
      searchText = {passSearchtext}
      />
    </section>
  )
}

export default JobsPage