let Notification = require("../models/notifications-database");

const notification_home = async (req, res) => {
    try {
        let allNotifs = await Notification.find({});
        res.render("notifications/index", { allNotifs, page: "all-notification" });
    } catch (error) {
        // console.log("Error while fetching notifications", error);
        req.flash('error', 'Error while fetching notifications')
        res.redirect('/')
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
        res.redirect("/notifications");
    } catch (error) {
        // console.log("Error while creating a new notification", error);
        req.flash('error', 'Error while creating a new notification')
        res.redirect('/notifications/new')
    }
}

const notification_delete = async (req, res) => {
    try {
        let id = req.params.id;
        await Notification.findByIdAndDelete(id);
        req.flash('success', 'Notification Deleted Success')
        res.redirect("/notifications", { allNotifs, page: "all-notification" });
    } catch (error) {
        // console.log("Error while deleting a notification", error);
        // req.flash('error', 'Error while deleting a notification')
        res.redirect('/notifications')
    }
}

module.exports = {
    notification_home,
    notification_new,
    notification_create,
    notification_delete
}
