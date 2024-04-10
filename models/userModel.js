const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter the User Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email Address"],
    },
    password: {
        type: String,
        required: [true, "Please Add the User Password"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);