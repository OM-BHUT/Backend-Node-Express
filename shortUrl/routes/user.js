const express = require('express');
const router = express.Router();
const {handleUserSignUp,
    handleUserLogin,
    showSignUp,
} = require('../controllers/user');
router.post('/',handleUserSignUp);
router.post('/login',handleUserLogin);
router.get('/signup',showSignUp);
router.get('/',);

module.exports = router;