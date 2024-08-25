const express = require('express');
const router = express.Router();
const {handleGetHomePage} = require('../controllers/staticRouterControllers');

router.get('/',handleGetHomePage);

module.exports = router;

