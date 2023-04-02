let express = require('express');
let router = express.Router();
let User = require('../models/users-database');
let { isAdmin, isLoggedIn } = require('../middlewares/middlewares')

// show
router.get('/users/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.render('users/show-user', { user, page: "home-page" });
    } catch (error) {
        console.log('problem while fetching user', error);
    }
})
// edit
router.get('/users/:id/edit', isLoggedIn, isAdmin, async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.render('users/edit-user', { user, page: "home-page" });
    } catch (error) {
        console.log('problem while fetching user', error);
    }
})
// update
router.patch('/users/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body.user);
        req.flash('success', 'User Updated Success')
        res.redirect(`/users/${req.params.id}`, { page: "home-page" });
    } catch (error) {
        req.flash('error', 'User Updated Failed')
        console.log('problem while updating user', error);
    }
})
// delete
router.delete('/users/:id', isLoggedIn, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        req.flash('success', 'User Deleted Success')
        res.redirect(`/`, { page: "home-page" });
    } catch (error) {
        req.flash('error', 'User Deleted Failed')
        console.log('problem while deleting user', error);
    }
})
module.exports = router;