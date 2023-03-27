let express = require('express');
let User = require('../models/users-database');
let router = express.Router();
const passport = require('passport');

router.get('/register', async(req,res)=>{
    // register form
    res.render('authentication/register')
})

router.post('/register', async(req,res)=>{
    let user = new User({
        username: req.body.username
    });
    // eval(require('locus'))
    let registerUser = await User.register(user,req.body.password);
    // Cookie will auto generated
    req.logIn(registerUser,(err) =>{
        if(err){
            console.log("error while registering user")
        }
        console.log("user registered")
        res.redirect('/jobs');
    })
})

router.get('/login',(req,res)=>{
    res.render('authentication/login');
    // res.send("login page")
})

router.post('/login', passport.authenticate('local',{failureRedirect: '/login'}) ,(req,res)=>{
    //login user
    console.log("user logged in")
    res.redirect('/jobs');
})

router.get('/logout',(req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log("error while logout")
        }
        console.log("user logged out")
        res.redirect('/jobs');
    });
})

module.exports = router;