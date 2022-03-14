const express = require('express');
const router = express.Router();
const userCtrl = require('./../controllers/user');
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/signup', urlencodedParser, userCtrl.signup);
router.post('/login', urlencodedParser, userCtrl.login);

module.exports = router;
