var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');
var moment = require('moment');
const mysql = require('mysql2');
var port = 8000
var app = express();
let JasonParser = app.use(bodyParser.json());
app.use(express.json())
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
      console.log("Unable to connect...")
    }
    else{
      console.log('Connected to the database succesfully!')
    }
  })
  ////////////////////////////////////////////////////////////////
  ///FIRST PAGE //
app.get("/",(req,res)=>{
    res.send("[Blog Page without DB]")
})

////////////////////////////////////////////////////////////////
/////GETTING DATA FROM DB /////
 app.get("/admin",(req,res,result)=>{
    connect.query('SELECT * FROM blog',(err,rows)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({
                ALL_Blogs: rows,
                Status:result
            })
            
        }
    
    })
 })
/////////////////////
//DELETING DATA FROM DB //
app.delete("/admin/:id",(req,res)=>{
    connect.query('DELETE FROM blog WHERE id =? ',[req.params.id],(err,rows,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send({
                Message:"Blog Deleted",
                Status:result
            })
            
        }
    
    })
 })


////////////////////
//ADDING DATA TO DB //
app.post("/admin",bodyParser.json(),(req,res,)=>{
   const title = req.body.title
   const description = req.body.description
   const author = req.body.author
   const views = req.body.views
   const uploadedOn = moment().format('YYYY/MM/DD')
    connect.query(`INSERT INTO blog(title,description,author,views,uploadedOn) VALUES(?,?,?,?,?)`,[title,description,author,views,uploadedOn],(err,result)=>{
      if(err){
            console.error(err)
     }
       else{
           res.json({
            Message:"Blog Added",
            Status:result
           })
   }
   })
})


//FIND DATA BY ID//
app.get('/admin/findbyId/:id', (req,res)=>{
    let id = req.params.id;
    const query = 'SELECT * FROM blog WHERE id =(?)';
    connect.query(query,[id],(err,rows)=>{
        if(err){
            console.error(err)
            
        }
        else{
            console.log(rows)
            res.json({Blog:rows})
        }
    });
})


//FIND DATA BY VIEWS//
app.get('/admin/findbyViews/:views', (req,res)=>{
    let views = req.params.views;
    const query = 'SELECT * FROM blog WHERE views = (?)';
    connect.query(query,[views],(err,rows)=>{
        if(err){
            console.error(err)
            
        }
        else{
            res.json({
                Message:"Blogs With "+views+" views: ",
                    Blog:rows})
        }
    });
})

/////////////////////////////////////////////////////
//UPDATING DATA TO DB //
 app.put('/admin/change/id/:id',bodyParser.json(),(req,res)=>{ 
    const id = req.params.id
    const title = req.body.title
    const description = req.body.description
    const author = req.body.author
    const views = req.body.views
    const uploadedOn = moment().format('YYYY/MM/DD')
    console.log([title, description, author, views, uploadedOn])
    const query = 'UPDATE  blog SET title=? , description=?, author=?, views=?, uploadedOn=? WHERE id = (?)';
      connect.query(query,[title,description,author,views,uploadedOn,id],(err,rows)=>{
      if(err){
            console.error(err)
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

 