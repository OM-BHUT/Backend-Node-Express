const express = require('express');
const {connectToMongo} = require('./connection');
const shortUrl = require('./models/shortUrl');
const cookieParser = require('cookie-parser');
const router = require('./routes/shortUrlRoutes');
const { bodyParse } = require('./middleWares/index');
const path = require('path');
const {checkForAuthentication,
    restrictTo,
} = require('./middleWares/auth');
const userRouter = require('./routes/user');
require('dotenv').config();
const staticRouter = require('./routes/staticRoutes')

 connectToMongo('mongodb+srv://'+process.env.UNAME+':'+process.env.PASS+'@cluster0.tpipx.mongodb.net/').then(()=>{
     const app=express();
     app.set('view engine','ejs');
     app.set('views',path.resolve('./views'));
     app.use(cookieParser());
     app.use('/',staticRouter);
     app.use(express.urlencoded({extended: false}))
     app.use(bodyParse());
    app.use('/shortUrl',checkForAuthentication,router);
    app.use('/users',userRouter);
     app.listen(process.env.PORT,()=>console.log(`Server Started at ${process.env.PORT}`));
 }).catch(error=>console.log(error));




