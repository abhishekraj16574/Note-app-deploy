import React from 'react'
import {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
const [formData , setFormdata]=useState({
  name:"",
  email:"",
  password:"",
});
const navigate = useNavigate();
const handleChange = (e)=>{
  setFormdata({
    ...formData,
    [e.target.name]:e.target.value,
  });
};
const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post("https://note-app-7hll.onrender.com/api/v1/user/signup",formData,{withCredentials:true});
    setFormdata({
      name:'',
      email:"",
      password:""
    });
    alert("Signup successfully please login ")
  }catch(error){
    console.log(error.message);
    alert(error.message);
  }
}

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='card w-96 bg-base-100 shadow-xl p-6'
      onSubmit={handleSubmit}
      >
       <h2 className='text-2xl font-bold text-center mb-4'>SignUp</h2>

       <input 
       type='text'
       name='name'
       placeholder='Enter your Name'
       value={formData.name}
       onChange={handleChange}
       className='input input-boardered w-full mb-5'
       />

       <input 
       type='email'
       name='email'
       placeholder='Enter Your Email'
       value={formData.email}
       onChange={handleChange}
       className='input input-boardered w-full mb-5'
       />

       <input 
       type='password'
       name='password'
       placeholder='Enter Your Password'
       value={formData.password}
       onChange={handleChange}
       className='input input-bordered w-full mb-5'
       />

       <button className='w-full mb-5 btn btn-primary rounded-lg bg-red-400  font-bold hover:cursor-pointer hover:bg-red-300 '
       type='submit'>SignUP</button>

       
        <div className="flex justify-center items-center gap-3 mt-3">
          <h5>Already have account ?</h5>

          <button
            type="button"
            onClick={()=>navigate("/login")}
            className="bg-red-400 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-500 hover:cursor-pointer"
          >
            Login
          </button>
        </div>

      </form>
      
    </div>
  )
}

export default Signup
