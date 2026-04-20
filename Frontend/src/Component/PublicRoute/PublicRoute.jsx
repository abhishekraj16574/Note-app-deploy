import React, { useContext } from 'react'
import { AuthContext } from '../../Context/Auth.jsx'
import { Navigate } from 'react-router-dom';

function PublicRoute({children}) {
  const { user } = useContext(AuthContext);
 if(user){
  return <Navigate to ="/" />
 }
 return children;
   
}

export default PublicRoute
