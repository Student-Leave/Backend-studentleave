const express = require('express')
const router = express.Router()

//Controller
const {
    register,
    login,
    listUser,
    editUser,
    deleteUser,
    currentUser,
    adduser
} = require('../controllers/auth')

// middleware
const { auth, adminCheck, teacherCheck } = require("../middleware/auth");

//@Endpoint  http://localhost:5000/api/register
//@Method   POST
//@Access   Publish
router.post('/register', register)
//@Endpoint  http://localhost:5000/api/register
//@Method   POST
//@Access   Publish
router.post('/adduser', adduser)

//@Endpoint  http://localhost:5000/api/login
//@Method   POST
//@Access   Publish
router.post('/login', login)



//@Endpoint  http://localhost:5000/api/current-user
//@Method   POST
//@Access   Private
router.post('/current-user', auth, currentUser)


//@Endpoint  http://localhost:5000/api/current-admin
//@Method   POST
//@Access   Private
router.post('/current-admin', auth, adminCheck, currentUser)

//@Endpoint  http://localhost:5000/api/current-teacher
//@Method   POST
//@Access   Private
router.post('/current-teacher', auth, teacherCheck, currentUser)









//@Endpoint  http://localhost:5000/api/auth
//@Method   GET
//@Access   Publish
router.get('/auth', listUser)



//@Endpoint  http://localhost:5000/api/auth
//@Method   PUT
//@Access   Publish
router.put('/auth', editUser)

//@Endpoint  http://localhost:5000/api/auth
//@Method   DELETE
//@Access   Publish
router.delete('/auth', deleteUser)


module.exports = router