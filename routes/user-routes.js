let express = require('express');
let router = express.Router();
let User = require('../models/users-database');
let {isAdmin,isLoggedIn} = require('../middlewares/middlewares')

// show
router.get('/users/:id', async (req, res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('users/show-user', {user});
    } catch (error) {
        console.log('problem while fetching user', error);
    }
})
// edit
router.get('/users/:id/edit', isLoggedIn,isAdmin , async (req, res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('users/edit-user', {user});
    } catch (error) {
        console.log('problem while fetching user', error);
    }
})
// update
router.patch('/users/:id',isLoggedIn,isAdmin , async (req, res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id, req.body.user);
        res.redirect(`/users/${req.params.id}`);
    } catch (error) {
        console.log('problem while updating user', error);
    }
})
// delete
router.delete('/users/:id',isLoggedIn,isAdmin , async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect(`/`);
    } catch (error) {
        console.log('problem while deleting user', error);
    }
})
module.exports = router;