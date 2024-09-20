const express = require('express');
const path = require('path');
const app = express();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage })

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('home');

})

app.post('/profile', upload.single('fileUpload'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.render('result', {
        filename: req.file.filename,
        filepath: `/uploads/${req.file.filename}`
    });
  })
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(3000,(req,res)=>{
    console.log(`server is running at 3000`);
    
})