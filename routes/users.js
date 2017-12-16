/* Packages Call */ 

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');




// Register 
router.post('/register', (req , res , next) => {
    let newuser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,

    })


    User.addUser(newuser , (err , user) => {

        if(err) {
            res.json({
                success: false,
                msg: 'Failed To Register'

            })

        } else {
            res.json({
                success: true,
                msg: 'User Successfully Registered !'

            })
        }

    })



})


/* ############################################################################################### */ 



// Authentication Route ==> Login System
router.post('/auth', (req , res , next) => {

    let singleUser = {
        username: req.body.username,
        password: req.body.password
    }


    User.getUserByUsername(singleUser.username , (err , user) => {
        if(!user) {
            return res.json({
                success: false,
                msg: 'User Not Found'
            })

        } else {

        User.comparePassword(singleUser.password , user.password , (err , isMatch) => {
            if(isMatch) {
                const token = jwt.sign(
                {
                    _id:user._id,
                    username:user.username,
                    password:user.password
                }
                ,config.secret, {
                    expiresIn:604800
                })
                return res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }

                })
            } else {
                return res.json({
                    success: false,
                    msg:'Wrong Password'
                })
            }

        })

    }

    })





})


/* ############################################################################################### */ 


// Profile of Users
router.get('/profile',passport.authenticate('jwt',{session:false}) ,(req , res , next) => {
        res.json({
            user: req.user
        })
})



module.exports = router;