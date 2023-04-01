let mongoose = require('mongoose');
let notificationSchema = new mongoose.Schema({
    body: String,
    author: String,
    createdAt : {
        type: Date,
        default: Date.now
    }
});

let notification = mongoose.model('notification',notificationSchema);
module.exports = notification;