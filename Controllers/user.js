const User=require('../Model/user')
const {v4: uuidv4}=require('uuid');
const jwt=require('jsonwebtoken');
const {setUser,getUser}=require('../Service/auth')



async function HandleUserSignUp(req,res){
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(404).json({
            msg:"All Fields are required"
        })
    }
    await User.create({
        name,
        email,
        password,
    })
    res.status(200).json({
        msg:"User Sign Up Successfull"
    })
}

async function HandleUserLogin(req,res){
    const {email,password}=req.body;
    if(!email || !password){
        res.status(404).json({
            msg:"All fields are required"
        })
    }
    const person=await User.findOne({email,password});
    if(!person){
        res.render("login",{
            error:"Invalid UserName or Password",
        })
        return;
    }
    const token=setUser(person);
    res.cookie("token",token);
    res.redirect("/");
    
}



module.exports={
    HandleUserSignUp,
    HandleUserLogin,
};