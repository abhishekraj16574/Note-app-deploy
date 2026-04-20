import User from "../Model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async(req,res)=>{
  try{
    const {name , email, password } = req.body;
     if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
   const user = await User.findOne({email});
   if(user){
    return res.status(400).json({
      success:false,
      message:"User already exist",
    });
   };

   const hashedPassword = await bcrypt.hash(password,10);

   const newUser = new User({
    name,
    email,
    password:hashedPassword,
    role:"user"
   });

   await newUser.save();

   const token = jwt.sign({_id:newUser._id,role:newUser.role},
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
   );

   res
   .status(201)
   .cookie("token",token,{
    expires:new Date(Date.now()+  60 * 60 * 1000),
    httpOnly:true,
    secure: false,
    sameSite: "lax",
   })
   .json({
    success:true,
    message:"User Created Successfully",
   });

  }catch(error){
    console.log(error.message);
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
  }
};

export const login = async(req,res)=>{
  try{
    const {email , password } = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Invalid User",
      })
    };
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({
        success:false,
        message:"Incorrect Password",
      })
    };
    
    const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,
      {expiresIn:"1h"}
    );
    res
    .status(200)
    .cookie("token",token,{
      expires:new Date(Date.now()+ 60 * 60 * 1000),
      httpOnly:true,
     secure: false,
    sameSite: "lax",
    })
    .json({
      success:true,
      message:"User loggedIn successfully",
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      }
    });

  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal server error",
    })
  }
};

export const logout = async(req,res)=>{
try{
  res
  .clearCookie("token",{
    expires:new Date(0),
  })
  .status(200)
  .json({message:"Logout Successfully"})
}catch(error){
  return res.staus(500).json({
    message:"Internal server error",
  })
}
}
export const userData = async(req,res)=>{
  try{
   const user = await User.findById(req.user._id);
  res.json({
    user,
  });
  }catch(error){
    console.log(error.message);
    return res.status(500).json({message:"internal server error"});
  }
  
};