const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    studentID: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    prefix: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    group: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
module.exports = User = mongoose.model('users', UserSchema);