const mongoose = require("mongoose");
const express = require("express");
const app = express();
const structureImported = require("./models/mongooseModel");
const path = require("path")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


;
app.use( ( req , res, next ) => {
    console.log('the server can now be used to send information at localhost:3000/input');
    next();
})

app.use(express.urlencoded({ extended: true }))

// app.use(express.urlencoded({ extended: true }),(req,res)=>{
//     console.log("only information that can be passed through the browser will be used")
// });

// the export and require functions are not working

// const structureExported = new mongoose.Schema({
//     name:String,
//     message:String
// })

// const databaseInput=mongoose.model("databaseInput",structureExported)


const firstInput= new structureImported({name:"dummyVariable",message:"check if working"})
const secondInput= new structureImported({name:"save",message:"trying to save from node.js"})
const thirdInput= new structureImported({name:"schema",message:"the schema is being exported as expected"})

secondInput.save()

app.get("/dbContents", (req, res)=>{
    res.send("the contents of the database go here")
}) 

app.get("/input", (req, res)=>{
    res.render("input")
    console.log("did you hit enter in the address bar? the server was refresed at get request localhost:3000/input")
})

app.post("/input", (req, res)=>{
    console.log("the following information is being posted from the input form");
    console.log(req.body)
    res.send(201);
})

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/helloWorld')//wanted the actual address localhost didnt work
    //database name is crudApp for future refrence
    .then(()=> {
      console.log("Mongo->Connection from node.js open, helloWorld db should be created")
    })
    .catch(err=> {
      console.log(" Mongo-> the following error occured from the node.js file.")
      console.log(err)
      console.log("Mongo-> check if your running the mongod in the powershell")
    })
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  }

app.listen(3000, ()=>{
    console.log("app listening on port 3000")
})