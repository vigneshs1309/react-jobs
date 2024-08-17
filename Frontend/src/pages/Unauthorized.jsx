import React from 'react'
import { Link } from 'react-router-dom';
import { FaBan } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaBan className="text-red-600 text-6xl mb-4">
      </FaBan>
      <h1 className="text-6xl font-bold mb-4">401 Unauthorized</h1>
      <p className="text-xl mb-5">You dont have access to this page</p>
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        >Go Back
      </Link>
    </section>
  )
}

export default Unauthorized