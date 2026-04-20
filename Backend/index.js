import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./Route/user.js";
import noteRoute from "./Route/Todo.js";
import cors from "cors";
import path from "path";

dotenv.config();
const PORT=process.env.PORT || 4011;
const URI=process.env.MONGO_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "true",
  redentials: true
}));

mongoose
.connect(URI)
.then(()=>console.log("MongoDb is connected"))
.catch((error)=>console.log("Mongo nDB is not connected"));



app.get("/ping",(req,res)=>{
  res.send("PONG");
});

app.use("/api/v1/user",userRoute);
app.use("/api/v1/note",noteRoute);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
})