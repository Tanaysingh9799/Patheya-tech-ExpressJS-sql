var express = require('express');
var router = express.Router();
var  _ = require('lodash');

//USER DATA
 var userD =   [
        {
          id: 1,
          first_name: "Tanay",
          last_name: "Singh",
          company: "Patheya",
          createdOn: new Date(),
        },

        {
          id: 2,
          first_name: "Sunil",
          last_name: "Mane",
          company: "Patheya",
          createdOn: new Date(),
        },

        {
          id: 3,
          first_name: "Vishal",
          last_name: "Singh",
          company: "G-Foils",
          createdOn: new Date(),
        },

        {
          id: 4,
          first_name: "Dhruvi",
          last_name: "Patel",
          company: "DesignBoat",
          createdOn: new Date(),
        },

        {
          id: 5,
          first_name: "Sonali",
          last_name: "Bhardwaj",
          company: "BHU",
          createdOn: new Date(),
        },


        {
          id: 6,
          first_name: "Priya",
          last_name: "Singh",
          company: "Apple",
          createdOn: new Date(),

        },

        {
          id: 7,
          first_name: "Sunny",
          last_name: "Singh",
          company: "Accounting Firm",
          createdOn: new Date(),
        },

        {
          id: 8,
          first_name: "Arunima",
          last_name: "Sharma",
          company: "DesignBoat",
          createdOn: new Date(),
        },

        {
          id: 9,
         first_name: "Abhishek",
          last_name: "Bhardwaj",
          company: "BHU",
          createdOn: new Date(),
        },

        {
          id: 10,
          first_name: "Pranav",
          last_name: "Kulkarni",
          company: "Patheya",
          createdOn: new Date(),
        },

      ]
 

      //CALL OPERATION
router.get('/', function (req, res, next) {
  res.send(userD);



  //USING LODASH TO GROUP ACCORDING TO PROPERTY NAME 
  router.get('/group/:propertyName',(req  ,res ) =>
  { 
    const findbypropertyName = _.groupBy(userD,req.params.propertyName)
    res.send(findbypropertyName)
  })



  router.get('/findby/:id',(req  ,res ) =>
  { 
    let findbyId = userD.find(f => f.id === parseInt(req.params.id))
    if (!userD){
      res.send(error)
    }
    else{
          res.send(findbyId)
        }
  })


  //CREATE OPERATION
  router.post('/create',(req,res) =>
  {
    let adduser = req.body
    let clonedata = {...adduser}
    clonedata.createdOn = new Date()
    userD.push(clonedata)
    res.send(
      {
    message:"Succesfully Added",
    User:clonedata
  })
  })
});



//UPDATE OPERATION
router.put('/update/:id', (req,res) => {
let id =  parseInt(req.params.id)
let company = req.body.company

let index = userD.findIndex(el => el.id == id)
userD[index] = {
...userD[index],
  company:company
}
if (error){
  res.send(error)
}
else {
  res.send({
    message:"Succesfully Updated",
    data:index
  })
}
});



//DELETE OPERATION
router.delete('/delete/:id',(req,res) =>{
  let id = parseInt(req.params.id)
  let nuserD = userD.filter(u => u.id!=id)
  userD = nuserD
  res.send({
    info:"User Deleted" ,
    data: nuserD})
});

module.exports = router;
