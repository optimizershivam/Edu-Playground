const express=require("express");
const cors = require("cors");

const UserRoute= require('./routes/UserRoutes');

require("dotenv").config();


const app=express();
app.use(cors())
app.use(express.json());

const connection = require('./config');
app.use("/user",UserRoute);

app.get("/",(req,res)=>{
    return res.status(200).send("Home Page")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("DB Connected")
    }
    catch(err){
        console.log(err)

    }
    console.log(`DB Connected at port ${process.env.PORT}`)
})
