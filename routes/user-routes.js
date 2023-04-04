let express = require('express');
let router = express.Router();
let { isAdmin, isLoggedIn } = require('../middlewares/middlewares')
let { show_user, edit_user, update_user, delete_user } = require('../controllers/user-controllers')

// show
router.get('/users/:id', isLoggedIn, show_user)

// edit
router.get('/users/:id/edit', isLoggedIn, isAdmin, edit_user)

// update
router.patch('/users/:id', isLoggedIn, isAdmin, update_user)

// delete
router.delete('/users/:id', isLoggedIn, isAdmin, delete_user)

module.exports = router;