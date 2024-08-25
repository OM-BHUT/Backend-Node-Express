const router = require('../routes/staticRoutes');
const shortUrl = require('../models/shortUrl');

async function handleGetHomePage(req,res){
    const urls = await shortUrl.find({});
    // res.send(urls);
    return res.render('home',{
        urls, 
    });
};


module.exports = {
    handleGetHomePage,
};