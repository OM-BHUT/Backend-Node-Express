const express = require('express');
const {connectToMongo} = require('./connection');
const shortUrl = require('./models/shortUrl');
const router = require('./routes/shortUrlRoutes');
const { bodyParse } = require('./middleWares/index');
const path = require('path');
require('dotenv').config();
const staticRouter = require('./routes/staticRoutes')

 connectToMongo('mongodb+srv://'+process.env.UNAME+':'+process.env.PASS+'@cluster0.tpipx.mongodb.net/').then(()=>{
     const app=express();
     app.set('view engine','ejs');
     app.set('views',path.resolve('./views'));
     app.use('/',staticRouter);
     app.use(express.urlencoded({extended: false}))
     app.use(bodyParse());
    app.use('/shortUrl',router);
     app.listen(process.env.PORT,()=>console.log(`Server Started at ${process.env.PORT}`));
 }).catch(error=>console.log(error));




