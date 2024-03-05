const express=require('express');
const {HandleUserSignUp,HandleUserLogin}=require('../Controllers/user')
const router=express.Router();

router.post("/",HandleUserSignUp).post("/login",HandleUserLogin);
module.exports=router;