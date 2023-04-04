let express = require("express");
let router = express.Router();

let { isLoggedIn, isAdmin } = require("../middlewares/middlewares");
let { notification_home, notification_new, notification_create, notification_delete } = require('../controllers/notification-controllers')

// index
router.get("/notifications", isLoggedIn, notification_home);

// new
router.get("/notifications/new", isLoggedIn, isAdmin, notification_new);

// create
router.post("/notifications", isLoggedIn, isAdmin, notification_create);

// delete
router.delete("/notifications/:id", isLoggedIn, isAdmin, notification_delete);

module.exports = router;
