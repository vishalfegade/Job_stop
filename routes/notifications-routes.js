let express = require("express");
let router = express.Router();

let Notification = require("../models/notifications-database");
let { isLoggedIn, isAdmin } = require("../middlewares/middlewares");

// index
router.get("/notifications", async (req, res) => {
  try {
    let allNotifs = await Notification.find({});
    res.render("notifications/index", { allNotifs, page: "all-notification" });
  } catch (error) {
    console.log("Error while fetching notifications", error);
  }
});

// new
router.get("/notifications/new", (req, res) => {
  res.render("notifications/new", { allNotifs, page: "all-notification" });
});

// create
router.post("/notifications", async (req, res) => {
  try {
    let newNotif = new Notification({
      body: req.body.body,
      author: req.body.author,
    });
    await newNotif.save();
    req.flash('success', 'Notification Posted Success')
    res.redirect("/notifications", { allNotifs, page: "all-notification" });
  } catch (error) {
    req.flash('error', 'Notification Posted failed')
    console.log("Error while creating a new notification", error);
  }
});

// delete
router.delete("/notifications/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    let id = req.params.id;
    await Notification.findByIdAndDelete(id);
    req.flash('success', 'Notification Deleted Success')
    res.redirect("/notifications", { allNotifs, page: "all-notification" });
  } catch (error) {
    req.flash('success', 'Notification Deleted failed')
    console.log("Error while deleting a notification", error);
  }
});

module.exports = router;
