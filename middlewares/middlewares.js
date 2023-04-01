// authentication
const isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        next();
    } else {
        console.log("you are not logged in")
        res.redirect('/login')
    }
}

// authorization
const isAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    } else {
        return res.send('you don\'t have permission to do that');
    }
}

// exports
module.exports = {
    isLoggedIn,
    isAdmin
}