let mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
     name:String,
     email:String,
     password:String,
     authToken:String
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
