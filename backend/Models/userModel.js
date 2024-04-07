const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        firstname: {
            type: String,
            require: true 
        },
        lastname: {
            type: String,
            require: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        workAt: String,
        relationship: String,
        country: String,
        followers: [],
        following: []
    },
    {timestamps: true}
)

const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;