import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RequireAuth = ({ children }) => {
  const location = useLocation()

  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.roles.includes(4321);

  //Verify whether the user is logined
  if (!userInfo) {
    return <Navigate to ='/login' state={{ path:location.pathname }}/>
  }

  //Verify whether it is reqruiter to add-job
  if (location.pathname === "/add-job") {
    if (isAdmin) {
      return children
    }
    else {
      return <Navigate to={'/unauthorized'}/>
    }
  }
  


  return children
}

export default RequireAuth