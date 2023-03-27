let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override')
let app = express();
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');

// connecting DataBase
mongoose.connect('mongodb+srv://admin:admin@hirehubdb.7hikjgj.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('db working')
})
.catch(()=>{
    console.log('db not working')
})

// set session
app.use(session({
    secret : 'SuperSecretPasswordForHireHub',
    resave : false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true //for https not for localhost
        // 1000 milliseconds
        expires: Date.now * 1000 * 60 * 60 * 24,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const User = require('./models/users-database.js');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// connecting to ejs file
app.set('view engine', 'ejs');

// use to get URL data
app.use(express.urlencoded({extended: true}));

// use to override pre build methods
app.use(methodOverride('_method'))

// public named folder => use this as a static resource, i.e. CSS & JS & Other things
app.use(express.static(path.join(__dirname + '/public')));

// Import the routes
let jobRoutes = require('./routes/jobs-routes.js')
app.use(jobRoutes);
let notificationRoutes = require('./routes/notifications-routes.js');
app.use(notificationRoutes);
let authRoutes = require('./routes/auth-routes.js')
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})