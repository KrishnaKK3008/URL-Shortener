const express=require('express');
const URL = require('../Model/url');
const router=express.Router();
const {restrictTo}=require('../Middlewares/auth')
/* router.get('/admin/url',restrictTo(["ADMIN"]),async (req,res)=>{
    const allurls=await URL.find({createdBy: req.user._id}); 
    return res.render('home',{
        urls:allurls
    });
}) */
router.get('/',restrictTo(["NORMAL","ADMIN"]),async (req,res)=>{
    if(!req.user) return res.redirect('/login');
    if(req.user.role==="ADMIN"){
        const allurls=await URL.find({});
        return res.render("home",{
        urls:allurls,
    })
    }
    else{
        const allurls=await URL.find({createdBy: req.user._id}); 
        return res.render('home',{
        urls:allurls
        });
    }
    
});

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.get("/login",(req,res)=>{
    res.render("login");
})

module.exports=router;