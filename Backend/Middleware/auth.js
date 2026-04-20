import jwt from "jsonwebtoken";
import user from "../Model/user.js";
export const isAuthenticate = (req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"Login Required",
    })
  }
  const decode = jwt.verify(token,process.env.JWT_SECRET);
  req.user = decode;
  next();
};

export const isAdmin = (req,res,next)=>{
   if(req.user.role !== "admin"){
    return res.status(403).json({message:"Admin Access Only"});
   }
   next();
}