let User = require("../models/users-database");

const showRegisterForm = (req,res) => {
    // register form
    res.render('authentication/register', { page: "home-page" })
}

const registerUser = async (req,res) => {
    // making a DataBase instance
    let user = new User({
        username: req.body.username,
        name: req.body.name,
        cgpa: req.body.cgpa,
    });
    // eval(require('locus'))
    // hashing and salting and saving
    let registerUser = await User.register(user, req.body.password);
    // Cookie will auto generated
    req.logIn(registerUser, (err) => {
        if (err) {
            console.log("error while registering user")
        }
        console.log("user registered")
        req.flash('success', 'Registration Successfully done')
        res.redirect('/jobs');
    })
}

const showLoginForm = (req,res) => {
    // login form
    res.render('authentication/login', { page: "home-page" })
}

const loginUser = (req, res) => {
    // login user
    console.log("user logged in")
    req.flash('success', 'Login Successful')
    res.redirect('/');
}

const logoutUser = (req, res) => {
    // logout user
    req.logOut((err) => {
        if (err) {
            console.log("error while logout")
        }
        console.log("user logged out")
        req.flash('success', 'Logout Successful')
        res.redirect("/login");
    });
}

module.exports = {
    showRegisterForm,
    registerUser,
    showLoginForm,
    loginUser,
    logoutUser
}