const express = require('express')
const router = express.Router();
const {userRegistration, userLogin} = require('../Controllers/authController');

router.post('/signup',userRegistration);

router.post('/signin', userLogin);

module.exports = router
