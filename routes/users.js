var express = require('express');
var router = express.Router();
var  _ = require('lodash');

/* GET users listing. */
 var userD =   [
        {
          id: 1,
          first_name: "Tanay",
          last_name: "Singh",
          company: "Patheya",
        },

        {
          id: 2,
          first_name: "Sunil",
          last_name: "Mane",
          company: "Patheya",
        },

        {
          id: 3,
          first_name: "Vishal",
          last_name: "Singh",
          company: "G-Foils",
        },

        {
          id: 4,
          first_name: "Dhruvi",
          last_name: "Patel",
          company: "DesignBoat",
        },

        {
          id: 5,
          first_name: "Sonali",
          last_name: "Bhardwaj",
          company: "BHU",
        },

        {
          id: 6,
          first_name: "Priya",
          last_name: "Singh",
          company: "Apple",

        },

        {
          id: 7,
          first_name: "Sunny",
          last_name: "Singh",
          company: "Accounting Firm",
        },

        {
          id: 8,
          first_name: "Arunima",
          last_name: "Sharma",
          company: "DesignBoat",
        },

        {
          id: 9,
         first_name: "Abhishek",
          last_name: "Bhardwaj",
          company: "BHU",
        },

        {
          id: 10,
          first_name: "Pranav",
          last_name: "Kulkarni",
          company: "Patheya",
        },

      ]
 
router.get('/', function (req, res, next) {
  res.send(userD);



  router.get('/group/:propertyName',(req  ,res ) =>
  { 
    const findbypropertyName = _.groupBy(userD,req.params.propertyName)
    res.send(findbypropertyName)
  })

  router.post('/make',(req,res) =>
  {
    let adduser = req.body
    let clonedata = {...adduser}
    clonedata.createdOn = new Date()
    userD.push(clonedata)
    res.send({
              message:"Succesfully Added",
              Data:clonedata})
  })
});

router.put('/change/:id', async(res,req) => {
let id = req.params.id
let company = req.body

let index = userD.findIndex(el => el.id = id)
userD[index] = {
...userD[index],
  company:company
}

res.send({
  message:"Succesfully Updated",
  Data:userD[index]
})

});

router.delete('/delete/:id',(req,res) =>{
  let id = parseInt(req.params.id)
  let nuserD = userD.filter(u => u.id!=id)
  userD = nuserD
  res.send({
    info:"User Deleted" ,
    data: nuserD})


});

module.exports = router;
