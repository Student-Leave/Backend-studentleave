const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken');



exports.listUsers = async (req, res) => {
    try {
        //code
        const user = await User.find({}).select('-password').exec();

        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.readUsers = async (req, res) => {
    try {
        //code
        const id = req.params.id
        const user = await User.findOne({ _id: id }).select('-password').exec();
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.updateUsers = async (req, res) => {
    try {
        //code
        var { id, password, Prefix, FirstName, LastName, Group, StudentID, Email, Phone } = req.body.values



        if (password) {
            // 1 gen salt
            const salt = await bcrypt.genSalt(10);
            // 2 encrypt
            enPassword = await bcrypt.hash(password, salt);
            const user = await User.findOneAndUpdate(

                { _id: id },
                {
                    password: enPassword,
                    studentID: StudentID,
                    prefix: Prefix,
                    firstname: FirstName,
                    lastname: LastName,
                    group: Group,
                    email: Email,
                    phone: Phone
                });
            res.send('Update password Success')

        } else {
            const user = await User.findOneAndUpdate(

                { _id: id },
                {
                    studentID: StudentID,
                    prefix: Prefix,
                    firstname: FirstName,
                    lastname: LastName,
                    group: Group,
                    email: Email,
                    phone: Phone
                });
            res.send('Update Data Success')
        }

        // const user = await User.findOneAndUpdate(
        //     { _id: id },
        //     {
        //         password: enPassword
        //     });
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.removeUsers = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete({ _id: id });
        res.send('Delete Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.changeStatus = async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            {
                enabled: req.body.enabled
            });
        res.send('Change Status Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.changeRole = async (req, res) => {
    try {
        console.log(req.body)
        const id = req.params.id
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role });
        res.send('Change Role Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}
