const router = require('../routes/shortUrlRoutes');
const shortUrl = require('../models/shortUrl');
const shortid = require("shortid");
const path = require('path');
const methodOverride = require('method-override');

async function handleShortRoutes(req,res){
    const body = req.body;
    if(!body.shortUrl) return res.status(400).json({error: 'please enter valid url'});
    if(body._method == 'DELETE'){
        const deletedUrl = await shortUrl.findOneAndDelete({
          shortId: body.shortUrl,
        });

        if(!deletedUrl) return res.status(400).json({error:'url not founded'});
        const urls = await shortUrl.find({});
        return res.render("home", {
          urls: urls,
        });

    }else{
        const newShortUrl= shortid();
        console.log('from handleShortRoutes');
        console.log(req.user);
        const newUrl = await shortUrl.create({
            shortId:newShortUrl,
            redirectUrl: body.shortUrl,
            details: [],
            createdBy: req.user._id,
        });
        const urls = await shortUrl.find({});
        // res.cookies();
        return res.render('home',{
            shortId:newShortUrl,
            // urls: urls,
        })
    }
}

async function handleRedirectToOriginalUrl(req,res){
    const url = req.params.shortId;
    const urlObj = await shortUrl.findOneAndUpdate({
            shortId:url,
    },{
        $push:{
            details:{
                timestamp:Date.now(),
            }
        }
    }
    );
    res.redirect(urlObj.redirectUrl);
}

async function handleAnalytics(req,res){
    const url = req.params.shortId;
    const urlObj = await shortUrl.findOne({
        shortId:url,
    });
    return res.send(
        {link:urlObj._doc.redirectUrl, length: urlObj.details.length}
    );
}
// get all
async function handleGetAll(req,res){
    console.log('from handleGetAll');
    console.log(req.user._id);
    const url = await shortUrl.find({createdBy: req.user?._id});
    return res.render('home',{
        urls:url,
    });
};

async function handleDeleteByShortUrl(req,res){
    const body = req.body;
    if(!body.shortUrl) return res.status(404).json({err:'url not founded'});
    const deletedUrl = await shortUrl.findOneAndDelete({shortId: body.shortUrl});
    const urls = await shortUrl.find({});
    return res.render('home',{
        urls:urls,
    });
}

module.exports = {
    handleShortRoutes,
    handleRedirectToOriginalUrl,
    handleAnalytics,
    handleGetAll,
    handleDeleteByShortUrl,
}