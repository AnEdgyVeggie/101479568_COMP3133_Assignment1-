const { Schema, model } = require("mongoose");

const UserSchema = new Schema({

    id: { // needs to be username
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date
    },

});

const User = model('User', UserSchema)

module.exports =  User;