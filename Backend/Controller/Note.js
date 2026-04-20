import Note from "../Model/Note.js";

export const createNote = async(req,res)=>{
  try{

    const {title , quotes}=req.body;
    const note = await Note.create({
      title,
      quotes,
      user:req.user._id,
    });
    res.status(201).json({
      success:true,
      note,
    });
  }catch(error){
    console.log(error.message);
    return res.status(500).json({
      message:"Internal server error"
    });
  };
};

export const getNotes = async(req,res)=>{
  try{
   const notes = await Note.find({user:req.user._id});
   res.status(200).json({
    success:true,
    notes,
   });

  }catch(error){
    console.log(error.message);
    return res.status(500).json({
      message:"Internal Server Error",
    });
  };
};

export const deleteNote = async(req,res)=>{
  try{
   const note = await Note.findById(req.params.id);
   if(!note){
    return res.status(400).json({
      message:"Note Not found",
    })
   };
   if(note.user.toString() !== req.user._id){
    return res.status(403).json({message:"Not allowed to delete"});
   };
   await note.deleteOne();
   res.status(200).json({success:true,message:"Note delete Successfully"});
  }catch(error){
    console.log(error.messgae);
    return res.status(500).json({
      message:"Internal server Error",
    });
  }
};