let mongoose = require('mongoose');
let notiSchema = new mongoose.Schema({
    body: String,
    author: String
});

let notification = mongoose.model('notification',notiSchema);
module.exports = notification;