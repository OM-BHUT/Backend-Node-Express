const { faker, tr } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'DELTA_APP',
  password:'12345678'
});
let getRandomUser = ()=> {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

 app.get('/',(req,res)=>{
    let q = `SELECT COUNT(*) FROM USER`;
    try {
    connection.query(q,(err,result)=>{
        if(err) throw err;
        const count =result[0]["COUNT(*)"];
        res.render('home',{
          count,
        });
    })
    
  } catch (err) {
    console.log(err);
    
  }
 });

 //GET ALL USERS
 app.get('/users',(req,res)=>{
    let q = `SELECT * FROM USER`;
    try {
      connection.query(q,(err,result)=>{
          if(err) throw err;
          let users = result;
          res.render('showUsers',{
            users
          });
      })
    } catch (err) {
      console.log(err);
      
    }
 });


app.get('/users/:id/edit',(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM USER WHERE ID = '${id}' `
  try {
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user = result[0];
        res.render('edit',{
          user
        });
    })
  } catch (err) {
    console.log(err);
    
  }
});

app.patch('/users/:id',(req,res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM USER WHERE ID = '${id}' `
  let {newUserName,password} = req.body;
  console.log(password);
  console.log(newUserName);
  
  try {
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user = result;
        let userPass = user[0]['PASSWORD'];
        if(password!=userPass) return res.send('incorrect password');
        let updateQuery = `UPDATE USER SET USERNAME = '${newUserName}' WHERE ID = '${id}'`
        connection.query(updateQuery,(err,result)=>{
          res.redirect('/users');
        })
    })
  } catch (err) {
    console.log(err);
  }
})

app.post('/users',(req,res)=>{
  let {id,userName,email,password} = req.body;
  let q = `INSERT INTO USER VALUES ('${id}','${userName}','${email}','${password}')`
  connection.query(q,(err,result)=>{
    res.redirect('/users');
  })
});

app.delete('/users/:id',(req,res)=>{
  let {id} = req.params;
  let q = `DELETE FROM USER WHERE ID = '${id}'`
  try {
    connection.query(q,(err,result)=>{
        if(err) throw err;
        res.redirect('/users');
    })
  } catch (err) {
    console.log(err);
    
  }
});

app.listen(8080,()=>{
  console.log('server is listening at 8080');
  
})
 // try {

  //   connection.query(q,[fakeUsers],(err,result)=>{
  //       if(err) throw err;
  //       console.log(result);
        
  //   })
    
  // } catch (err) {
  //   console.log(err);
    
  // }
