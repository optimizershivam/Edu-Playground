const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");
const router = express.Router();
require('dotenv').config();

router.post("/signup", async (req,res) => {
    const { email, password } = req.body;
    console.log({email,password})
    try{
        const oldEmail = await UserModel.find({email: email});

        if (email && oldEmail.length > 0 ) {
            return res.send({message: "Email has already Exists", status: "error"});
        };
        const salt = await bcrypt.genSalt(10);
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                return res.send({message: "Invalid Password", status: "error"})
            } 
                const user = new UserModel({ email, password: hash });
                await user.save();
                return res.send({status: "success",message:"Registration Susscessfull"})
        })
    } catch {
        return res.send({status: "error", message: "Signup failed"})
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.send({message: "Email does not exists", status: 'error'});
        }
        bcrypt.compare(password, user.password,(err, result) => {
            if (err) {
                return res.send({message: "Incorrect Password", status: 'error'})
            } if (result) {
                const token=jwt.sign({email:user.email,userid:user._id},"shhhhh")
                return res.send({message: "Login Successfull", status: 'success', user: {_id: user._id, email: user.email, token}});
            } else{
                return res.send({message: "invalid password", status: 'error'})
            }
        })
    } catch {
        return res.send({status: "error", message: "Login failed"})
    }
})

module.exports = router;