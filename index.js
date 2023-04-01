let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override')
let app = express();
let path = require('path');
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');
let moment = require('moment');

// let dotenv = require('dotenv').config();
let dotenv = require('dotenv');
dotenv.config();
// console.log(process.env)

let URI = process.env.DB_URI;
let SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

// connecting DataBase
mongoose.connect(URI)
.then(()=>{
    console.log('Database Connected')
})
.catch(()=>{
    console.log('Database Not Connected')
})

// set session
app.use(session({
    secret : SESSION_SECRET_KEY,
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

// Middleware to pass currentUser to all routes
app.use(function(req, res, next) {
    //* res.local is use to make a variable or object available to all files & folders locally
	res.locals.currentUser = req.user;
    res.locals.moment = moment;
	next(); // next is used to go to next step
});

// Import the routes
let jobRoutes = require('./routes/jobs-routes.js')
app.use(jobRoutes);
let notificationRoutes = require('./routes/notifications-routes.js');
app.use(notificationRoutes);
let authRoutes = require('./routes/auth-routes.js')
app.use(authRoutes);
let userRoutes = require('./routes/user-routes.js');
app.use(userRoutes);
let questionRoutes = require('./routes/question-routes.js');
app.use(questionRoutes);

let PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})