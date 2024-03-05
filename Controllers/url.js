const shortid=require("shortid");
const URL=require("../Model/url")
async function HandleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({msg:"Send the URl to be Shortened"});
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
        createdBy: req.user._id,
    });

    return res.render("home",{
        id:shortID
    });
}
async function GetTotalAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ msg: "Short URL not found" });
        }

        return res.status(200).json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

async function HandleGetRequest(req,res){
    const shortId=req.params.shortId;
    const entry =await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            },
                
        },
    });
    res.redirect(entry.redirectURL);
}

module.exports={
    HandleGenerateNewShortURL,
    HandleGetRequest,
    GetTotalAnalytics
};
