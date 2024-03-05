const express=require("express");
const {HandleGenerateNewShortURL,HandleGetRequest,GetTotalAnalytics}=require("../Controllers/url");
const router=express.Router();

router
.post("/",HandleGenerateNewShortURL)
.get("/:shortId",HandleGetRequest)
.get("/analytics/:shortId",GetTotalAnalytics)

module.exports=router;