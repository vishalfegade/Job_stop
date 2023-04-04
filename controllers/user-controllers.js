let User = require('../models/users-database');

const show_user = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.render('users/show-user', { user, page: "home-page" });
    } catch (error) {
        req.flash('error', 'User Not found')
        res.redirect('/')
        // console.log('problem while fetching user', error);
    }
}

const edit_user = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.render('users/edit-user', { user, page: "home-page" });
    } catch (error) {
        req.flash('error', 'Problem while editing user')
        res.redirect('/')
        // console.log('problem while fetching user', error);
    }
}

const update_user = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body.user);
        req.flash('success', 'User Updated Success')
        res.redirect(`/users/${req.params.id}`, { page: "home-page" });
    } catch (error) {
        req.flash('error', 'User Updated Failed')
        res.redirect(`/users/${req.params.id}`)
        // console.log('problem while updating user', error);
    }
}

const delete_user = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        req.flash('success', 'User Deleted Success')
        res.redirect(`/jobs`, { page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'User Deleted Failed')
        res.redirect('/')
        // console.log('problem while deleting user', error);
    }
}

module.exports = {
    show_user,
    edit_user,
    update_user,
    delete_user
}