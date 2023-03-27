let express = require('express');
let mongoose = require('mongoose');
let methodOverride = require('method-override')
let app = express();

// connecting DataBase
mongoose.connect('mongodb+srv://admin:admin@hirehubdb.7hikjgj.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('db working')
})
.catch(()=>{
    console.log('db not working')
})

// connecting to ejs file
app.set('view engine', 'ejs');

// use to get URL data
app.use(express.urlencoded({extended: true}));

// use to override pre build methods
app.use(methodOverride('_method'))

// public named folder => use this as a static resource, i.e. CSS & JS & Other things
app.use(express.static(__dirname + '/public'));

// Import the routes
let jobRoutes = require('./routes/jobs-routes.js')
app.use(jobRoutes);
let notificationRoutes = require('./routes/notifications-routes.js')
app.use(notificationRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})