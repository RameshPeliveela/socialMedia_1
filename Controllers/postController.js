const postModel = require('../Models/postModel');
const userModel = require('../Models/userModel');
const { post } = require('../Routes/postRouter');

//Create a new post
async function createPost(req, res) {

    const data = req.body;
    const newPost = new postModel(data);
    try{
        await newPost.save();
        res.status(201).json("Post is created") 
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}


//get post
async function getPost(req, res) {
    const {postid} = req.params; //postid you want to get
    try{
        const post = await postModel.findById(postid);
        if(!post){
            return res.status(400).json("No post with this Id")
        }
        return res.status(200).json(post)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}


//update the post
async function updatePost(req, res) {
    const {postid} = req.params; //post id which you want to update

    const {userId} = req.body; //user who want to update the post
    try{
        const post = await postModel.findById(postid)

        if(!post){
            return res.status(400).json("No posts")
        }

        if(! (post.userId === userId)){
            return res.status(404).json("unauthorized access")
        }
        await post.updateOne({$set: req.body})
        return res.status(200).json("post is updated")
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
    
}


//delete post
async function deletePost(req, res) {
    const {postid} = req.params;
    const {userId} = req.body;
    try {
        const post = await postModel.findById(postid); 

        if(!post){
            return res.status(400).json("No posts")
        }
        
        if(! (post.userId === userId)){
            return res.status(404).json("Unauthorized access")
        }
        await postModel.findByIdAndDelete(postid);
        return res.status(200).json("Post is deleted");

    } 
    catch (err){
        console.log(err)
        return res.status(500).json(err)
    }
}

//like/dislike
async function likeOrDislike(req, res) {
    const {postid} = req.params;
    const {userId} = req.body;
    try{
        const post = await postModel.findById(postid);
        if(!post){
            return res.status(400).json("No posts")
        }
        if(post.likes.includes(userId)){
            await post.updateOne({$pull : {likes: userId}})
            return res.status(200).json("disliked")
        }
        else{
            await post.updateOne({$push: {likes: userId}})
            return res.status(200).json("liked")
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)  
    }
    
}

//time line posts
async function getTimeLinePosts(req, res){
    const {userId} = req.body;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).json("User not found")
        }
        const followers = user.followers;
        const posts = await postModel.find({userId:followers})
        if(!posts){
            return res.status(400).json("No posts")
        }
        posts.sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        res.status(200).json(posts)

        // followers.forEach(async (follower)=>{
        //     const posts = await postModel.find({userId:follower})
        //     console.log(posts)
        // })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json(err); 
    }
}

module.exports = {createPost, getPost, updatePost, deletePost, likeOrDislike, getTimeLinePosts}
