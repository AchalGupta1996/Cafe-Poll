const express= require("express");
const dotenv = require("dotenv").config();
const database= require("./config/dbConnection");
const bodyParser = require("body-parser");
const session = require("express-session");

const app=express();
const port =process.env.port;  //now port is coming from a new file .env which will have all the vars so that some other user may use them.

database();

//Middleware

app.use(
    session({
        secret : "my secret key",
        saveUninitialized : true,
        resave: false,
    })
);
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",require("./routes/route"));


app.set("view engine","ejs");


// app.get("/",(req,res)=>{
//     res.send("hello");
// })



app.listen(port,()=>{
    console.log("app is live on port : "+ port)
})