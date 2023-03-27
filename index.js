const express=require("express");
const {connection}=require("./db");
require("dotenv").config();
const app=express();
const {userRouter}=require("./routes/users.routes");
const {postRouter}=require("./routes/posts.routes");
const {auth}=require("./middlewares/auth.middleware");
const cors=require("cors");
app.use(express.json());

app.use(cors());
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to LinkedIn");
})

app.use("/users",userRouter);
app.use(auth);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to MongoDB Altlas");
        console.log(`Running the server at port ${process.env.port}.`);
    } catch (error) {
        console.log("connection to db failed\n",error);  
    }
})