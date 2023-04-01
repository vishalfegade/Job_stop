let express = require("express");
let router = express.Router();

let Notification = require("../models/notifications-database");
let {isLoggedIn, isAdmin } = require("../middlewares/middlewares");

// index
router.get("/notifications", async (req, res) => {
  try {
    let allNotifs = await Notification.find({});
    res.render("notifications/index", { allNotifs });
  } catch (error) {
    console.log("Error while fetching notifications", error);
  }
});

// new
router.get("/notifications/new", (req, res) => {
  res.render("notifications/new");
});

// create
router.post("/notifications", async (req, res) => {
  try {
    let newNotif = new Notification({
      body: req.body.body,
      author: req.body.author,
    });
    await newNotif.save();
    res.redirect("/notifications");
  } catch (error) {
    console.log("Error while creating a new notification", error);
  }
});

// delete
router.delete("/notifications/:id",isLoggedIn, isAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    await Notification.findByIdAndDelete(id);
    res.redirect("/notifications");
  } catch (error) {
    console.log("Error while deleting a notification", error);
  }
});

module.exports = router;
