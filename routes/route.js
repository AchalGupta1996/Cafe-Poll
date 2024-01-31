const express= require("express");
const cafeObject = require("../models/model");

const router = express.Router();

router.get("/",async (req,res)=>{
    try{
         const cafeList = await cafeObject.find();
        //  res.send(cafeList)
         res.render("home",{
            title:"Cafe Page",
            // message:"a new cafe"
            data:cafeList
        });
       }

    catch{
            console.log("error while displaying list from db")
    }
    // res.send("hello");
})


router.get("/add",(req,res)=>{
    res.render("addCafe",{
        title:"Add Cafe"
    })
})



router.get("/rate/:id", async (req,res)=>{
    const id= req.params.id;
    // console.log(id)
    try{
        const cafe= await cafeObject.findById(id);
        // console.log(cafe.name)
        res.render("rateCafe",{
            title:`Rate ${cafe.name}`,
            cafe:cafe
        })

    }

    catch(error){
            console.log("some error occured while fetching data")
    }
})


router.post("/add",async (req,res)=>{
    console.log(req.body);

    try{
        const cafe= new cafeObject({
            name:req.body.name,
            phone:req.body.phone,
            reviewSum:0,
            reviewCount:0
        })
        await cafe.save();
        console.log("saved a new cafe " + cafe);
        req.session.message={
            type:"success",
            info:"you have added a new cafe successfully"
        }
        // res.send(cafe);
        res.redirect("/");
    }
    catch{
            console.log("error coming")
    }
})


router.post("/rate/:id", async (req,res)=>{
    const id= req.params.id;
    const rating = parseInt(req.body.rating)
    // console.log(req.body.rating)
    try{
        const cafe= await cafeObject.findById(id)
        const newSum = parseInt(cafe.reviewSum) + rating
        const newCount = parseInt(cafe.reviewCount) + 1
        
        await cafeObject.findByIdAndUpdate(id,{
                reviewSum : newSum,
                reviewCount : newCount
        });

        req.session.message={
            type:"success",
            info:"you have rated successfully"
        }
        // console.log(cafe.name)   
        res.redirect("/") ;    
    }
    catch(error){
            console.log("some error occured while fetching data")
    }
})



module.exports= router;