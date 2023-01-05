var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var moment = require('moment');
const mysql = require('mysql2')
var port = 8000

var app = express();
/// Connected to the database//
const connect = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456654321',
    database:'sys' 
})
////////////////////////////////////////////////////////////////
connect.connect((error)=>{
    if(error){
      console.log("unable to connect")
    }
    else{
      console.log('Connected to the database succesfully!')
    }
  })
  ////////////////////////////////////////////////////////////////
  ///FIRST PAGE //
app.get("/",(req,res)=>{
    res.send("Blog Page without DB")
})

////////////////////////////////////////////////////////////////
/////GETTING DATA FROM DB /////
 app.get("/admin",(req,res)=>{
    connect.query('SELECT * FROM blog',(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({
                ALL_Blogs: rows
            })
            
        }
    
    })
 })
/////////////////////
//DELETING DATA FROM DB //
app.delete("/admin/:id",(req,res)=>{
    connect.query('DELETE FROM blog WHERE id =? ',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({
                ALL_Deleted_Blogs: rows
            })
            
        }
    
    })
 })








////////////////////
//ADDING DATA TO DB //
app.post("/admin",(req,res)=>{

    var update = req.body
    var updatedData = [update.title,update.description,update.author,update.views,update.uploadedOn]
    connect.query('INSERT INTO blog(title, description , author , views, uploadedOn) VALUES = (?)',[updatedData],(err,rows)=>{
      if(err){
            console.error("Failed to add blog")
     }
       else{
           console.log(rows)
           res.json(rows)
   }
   })
})


///FIND DATA BY ID//
app.get('/admin/find/:id', (req,res)=>{
    let id = req.params.id;
    const query = 'SELECT * FROM blog WHERE id =?';
    connect.query(query,[id],(err,rows)=>{
        if(err){
            console.error(err)
            
        }
        else{
            console.log(rows)
            res.json(rows)
        }
    });
})

////////////////////////////////////////////////////////////////
//UPDATING DATA TO DB //
app.put('/admin/change/:id',(req,res)=>{ 

    
    var update = req.body
    var updatedData = [update.title,update.description,update.author,update.views,update.uploadedOn]
    const query = 'UPDATE INTO blog VALUES = ?';
    let values = [title, description, author, views, uploadedOn];
    connect.query(query,[updatedData],(err,rows)=>{
      if(err){
            console.error("Fail to add blog")
     }
       else{
           console.log(rows)
           res.json(rows)
   }
   })

})


 app.listen(port,() => {
    console.log(`App is listening on = http://localhost:8000/`)
  
  });

 