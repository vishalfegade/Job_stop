let Notification = require("../models/notifications-database");

const notification_home = async (req, res) => {
    try {
        let allNotifs = await Notification.find({});
        res.render("notifications/index", { allNotifs, page: "all-notification" });
    } catch (error) {
        console.log("Error while fetching notifications", error);
    }
}

const notification_new = (req, res) => {
    res.render("notifications/new", { page: "all-notification" });
}

const notification_create = async (req, res) => {
    try {
        let newNotif = new Notification({
            body: req.body.body,
            author: req.body.author,
        });
        await newNotif.save();
        req.flash('success', 'Notification Posted Success')
        res.redirect("/notifications", { page: "all-notification" });
    } catch (error) {
        req.flash('error', 'Notification Posted failed')
        console.log("Error while creating a new notification", error);
    }
}

const notification_delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Notification.findByIdAndDelete(id);
        req.flash('success', 'Notification Deleted Success')
        res.redirect("/notifications", { allNotifs, page: "all-notification" });
    } catch (error) {
        req.flash('success', 'Notification Deleted failed')
        console.log("Error while deleting a notification", error);
    }
}

module.exports = {
    notification_home,
    notification_new,
    notification_create,
    notification_delete
}