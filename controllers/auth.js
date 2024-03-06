const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        // Check user
        const { studentID, password, email, phone, prefix, firstname, lastname, group } = req.body
        var user = await User.findOne({ studentID })
        var userEmail = await User.findOne({ email })
        if (user) {
            return res.status(400).send('User Already exists')
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            studentID,
            password,
            email,
            phone,
            prefix,
            firstname,
            lastname,
            group
        });

        // Encrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log("Register by", studentID)
        res.send('Register Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}
exports.adduser = async (req, res) => {
    try {
        // Check user
        const { studentID, password, email, phone, prefix, firstname, lastname, group, role } = req.body
        var user = await User.findOne({ studentID })
        var userEmail = await User.findOne({ email })
        if (user) {
            return res.status(400).send('User Already exists')
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            studentID,
            password,
            email,
            phone,
            prefix,
            firstname,
            lastname,
            group,
            role
        });

        // Encrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log("Add User ID", studentID)
        res.send('Add User Success')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.login = async (req, res) => {
    try {
        const { studentID, password } = req.body;
        var user = await User.findOneAndUpdate({ studentID }, { new: true });
        if (user && user.enabled) {
            // Check Password
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!')
            }
            //Paload
            const payload = {
                user: {
                    _id: user.id,
                    studentID: user.studentID,
                    role: user.role,
                    email: user.email,
                    phone: user.phone,
                    prefix: user.prefix,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    group: user.group,

                }
            }
            // Generate Token
            jwt.sign(payload,
                'jwtSecret',
                { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ token, payload })
                })

        } else {
            return res.status(400).send('User Not found!!!')
        }


    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }


}

exports.currentUser = async (req, res) => {
    try {
        // modle User
        console.log('controller', req.user)
        const user = await User.findOne({ studentID: req.user.studentID })
            .select('-password').exec();
        res.send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.listUser = async (req, res) => {
    try {
        res.send('list Get User')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.editUser = async (req, res) => {
    try {
        res.send('edit User')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}

exports.deleteUser = async (req, res) => {
    try {
        res.send('removed User')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server ERROR!')
    }
}   