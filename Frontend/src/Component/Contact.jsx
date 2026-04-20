import React, { useState } from "react";
import axios from "axios";
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
       const res = await axios.post("/api/v1/user/contact",form,{
        withCredentials:true,
       });
       if(res.data.success){
        setForm({name:"",email:"",message:""})
           alert("Message sent 🚀");
      
       }
     
    }catch(error)
    {
      alert("MEssage Not Sent Internal Server Error")
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-200 to-purple-200">
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-5 text-center">Contact Us</h2>

        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;