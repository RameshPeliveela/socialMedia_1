
const userModel = require('../Models/userModel');

async function userRegistration(req, res){
    try{
        const data = req.body;
        const newUser = new userModel(data);
        const response = await newUser.save();
        res.status(201).json({user:response})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

async function userLogin(req, res) {
    const {username, password} = req.body;
    
    try{
        const user = await userModel.findOne({username:username})
        if(!user){
            return res.status(400).json({Error: 'user not found'})
        }
        const psw_match = await user.comparePassword(password);
        if(!psw_match){
            return res.status(400).json({Error: 'Incorrect Password'})
        }
        res.status(200).json({user: user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

module.exports = {userRegistration, userLogin}