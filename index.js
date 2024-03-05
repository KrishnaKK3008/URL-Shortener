const express=require("express");
const path=require("path");
const app=express();
const cookieParser = require("cookie-parser");
const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const ConnectMongoDB=require("./connection.js");
const URL=require("./Model/url.js")
const {checkforAuthentication,restrictTo}=require('./Middlewares/auth.js')

const staticRoute=require('./Route/staticRouter.js')
const urlRoute=require("./Route/url.js")
const userRoute=require('./Route/user.js')


ConnectMongoDB()
    .then(()=>{console.log("DB connected")})
    .catch((err)=>console.log("Error in DB Connection"));



app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(checkforAuthentication);

app.use('/',staticRoute);
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);


app.get("/analytics/test",async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render("home",{
        urls:allUrls
    });
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
});