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

app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'))

// Import the routes
let jobRoutes = require('./routes/index')
app.use(jobRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})