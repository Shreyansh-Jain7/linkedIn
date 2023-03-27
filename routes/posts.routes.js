const express=require("express");
const {PostModel}=require("../models/posts.model");
const postRouter=express.Router();
const jwt=require("jsonwebtoken");

postRouter.get("/",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;
    console.log(_id);
    try {
        const posts=await PostModel.find({user:_id});
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

postRouter.get("/top",async(req,res)=>{
    const decoded=jwt.verify(req.headers.authorization,"secretkey");
    const _id=decoded.userId;
    console.log(_id);
    try {
        const posts=await PostModel.find({user:_id}).sort({no_of_comments:-1}).limit(3);
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})

postRouter.post("/add",async (req,res)=>{
    try{
        const post=new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":"post has been added"})
    }catch(err){
        res.status(400).send({"msg":err.message});
    }
})

postRouter.patch("/update/:id",async (req,res)=>{
    const id=req.params.id;
    try {
        await PostModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send({"msg":`post ${id} has been updated`});
    } catch (error) {
        res.status(400).send({"msg":err.message});
    }
})

postRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    try {
        await PostModel.findByIdAndDelete({_id:id});
        res.status(200).send({"msg":`post ${id} has been deleted`});
    } catch (error) {
        res.status(400).send({"msg":err.message});
    }
})

module.exports={postRouter};