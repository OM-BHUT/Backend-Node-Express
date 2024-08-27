const User = require('../models/users')
const {v4: uuidv4} = require('uuid');
const {setUser,
    getUser,
} = require('../services/auth');
async function handleUserSignUp(req,res){
    const {name,email,password} = req.body;
    const user = await User.create({
       name,
        email,
        password
    });
    return res.render('home');
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    
    if(!user) return res.render('login',{
        error:'email or password not found'
    });
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.render('home');
}

async function showSignUp(req,res) {
    return res.render('signUp');
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
    showSignUp,
}