import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/Auth'
import { Navigate } from 'react-router-dom'
function Protected({children}) {
  const {user , loading} = useContext(AuthContext);
   if(loading) return <h2 className='text-center mt-10 font-bold color-red-500'>loading...</h2>
   if(!user)
    {
      return <Navigate to ="/login" replace />;
    }
    return children;
}

export default Protected;
