import {createContext, useState , useEffect, Children} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user , setUser] = useState(null);
  const [loading , setLoading]= useState(null);

  const fetchUser = async()=>{
    try{
      const res = await axios.get("https://note-app-7hll.onrender.com/api/v1/user/me",{
        withCredientials:true,
      })
      .then(res=>{
               setUser(res.data.user);
               setLoading(false);
      })
    }catch(error){
      
     setLoading(false);
      setUser(null);
      
    }finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchUser();
  },[]);

  const logout = async()=>{
    try{
      await axios.post("https://note-app-7hll.onrender.com/api/v1/user/logout",{withCredientials:true});
      setUser(null);
    }catch(error){
      console.log(error.message);
      
    }
  }

  return (
    <AuthContext.Provider value={{user , loading , setUser,fetchUser , logout }}>
      {children}
    </AuthContext.Provider>
  );
};