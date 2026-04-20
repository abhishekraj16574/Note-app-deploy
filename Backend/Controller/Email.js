import express from "express";
import { sendMail } from "../util/sendEmail.js";

export const contact = async(req,res)=>{
  try{
    const { name , email , message } = req.body;

    if(!name || !email || !message){
      return res.status(400).json({
        success:false,
        message:"All field are required",
      })
    };

    const text=`hey my name is ${name} And my Email id is ${email} 
    i have some message for you .... ${message}`;

    await sendMail("Contact from Notes app 🚀",text);
    return res.status(200).json({
      success:true,
      message:"Message Sent Successfully",
    });

  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal server error",
    });
  };
};