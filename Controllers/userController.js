const bcrypt = require('bcrypt')
const userModel = require('../Models/userModel')


//get user
async function getUser(req, res) {
    const id = req.params.id;
    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(400).json({Error: 'user not found'})
        }
        const {password, ...otherdetails} = user._doc
        res.status(200).json(otherdetails)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

//update the user
async function updateUser(req, res){
    const {id} = req.params
    const {currentUserId, currentUserAdminStatus, password} = req.body;
    try{
        if(id === currentUserId || currentUserAdminStatus){
            if(password){
                const salt = await bcrypt.genSalt(10);
                const hashedpswd = await bcrypt.hash(password, salt);
                req.body.password = hashedpswd;
            }
    
            const response = await userModel.findByIdAndUpdate(id, req.body, {new:true})
            return res.status(200).json(response)
        }
        else{
            return res.status(404).json({Error: 'you can edit only your data'})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: "Internal server Error"})
    }
}

//Delete user
async function deleteUser(req, res) {
    const {id} = req.params;
    const {currentUserId, currentUserAdminStatus} = req.body

    if(currentUserId === id || currentUserAdminStatus){
        try{
            await userModel.findByIdAndDelete(id)
            return res.status(200).json({Message: 'User deleted successfully'})
        }
        catch(err){
            console.log(err)
            return res.status(500).json({Error: 'Internal Server Error'})
        }
    }
    else{
        return res.status(404).json({Error: 'you can delete only your data'})
    }
}


//following controller
async function followingController(req, res) {
    
    const {id} = req.params //whom you want to follow
    const {currentUserId} = req.body //I am sending request to follow
    try{
        const followingUser = await userModel.findById(id);
        const followerUser = await userModel.findById(currentUserId);
        if(id === currentUserId){
            return res.status(403).json("Action Forbidden")
        }

        if(followingUser.followers.includes(currentUserId)){
            return res.status(403).json("You are already following them")
        }
        await followingUser.updateOne({$push: {followers: currentUserId}})
        await followerUser.updateOne({$push: {following: id}})
        res.status(200).json("User is followed")
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: "Internal server Error"})
    }
}


//unfollow the user
async function unfollowController(req, res) {
    const {id} = req.params;
    const {currentUserId} = req.body;
    if(id === currentUserId){
        return res.status(403).json("Action forbidden")
    }

    try{
        const followingUser = await userModel.findById(id)
        const followerUser = await userModel.findById(currentUserId);

        if(!followingUser.followers.includes(currentUserId)){
            return res.status(404).json("You are not following them")
        }
        await followerUser.updateOne({$pull: {following: id}})
        await followingUser.updateOne({$pull: {followers: currentUserId}})

        return res.status(200).json("unfollowed successfully")
    }
    catch(err){
        console.log(err)
        return res.status(500).json("Internal server Error")
    }
}

module.exports = {getUser, updateUser, deleteUser, followingController, unfollowController}
