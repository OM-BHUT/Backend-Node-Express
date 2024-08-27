const {getUser} = require('../services/auth');

async function restrictToLoggedInOnly(req,res,next){


    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.redirect('/login');
    }
    const user = await getUser(userUid);
    if(!user) return res.redirect('/users');
    req.user = user;
    next();
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = await getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInOnly,
    checkAuth,
}