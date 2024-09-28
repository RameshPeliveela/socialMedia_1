const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },

    profilePicture:String,
    coverPicture:String,
    about:String,
    livesin:String,
    worksAt:String,
    relationship:String,
    followers:[],
    following:[],
    //totalPosts: Number

}, {timestamps:true})


userSchema.pre('save', async function hashingPassword(){
    try{
        const user = this;
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(user.password, salt)
        user.password = hashedpassword;
    }
    catch(err){
        console.log(err)
    }
})


userSchema.methods.comparePassword = async function(typedPassword){
    try{
        const result = await bcrypt.compare(typedPassword, this.password);
        return result;
    }
    catch(err){
        console.log(err)
    }
}


const userModel = mongoose.model('users', userSchema)

module.exports = userModel;
