import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'
import logo from '../assets/images/logo.png';
import Avatar from './Avatar'


const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const LinkClass = ({isActive}) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2':'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src= { logo }
                alt="React Jobs"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >React Jobs</span
              >
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className= { LinkClass }
                  >Home
                </NavLink>
                <NavLink
                  to="/Jobs"
                  className= { LinkClass }
                  >Jobs
                </NavLink>
                <NavLink
                  to="/add-job"
                  className= { LinkClass }
                  >Add Job
                </NavLink>
                {!userInfo ?
                  (
                    <NavLink
                      to="/login"
                      className= { LinkClass }
                      >Login
                    </NavLink>
                  ):(
                    <Avatar />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar