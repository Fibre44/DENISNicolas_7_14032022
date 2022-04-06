const express = require('express');
const router = express.Router();
const messageCtrl = require('./../controllers/message');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', auth, urlencodedParser, accessControl, urlencodedParser, messageCtrl.create)

module.exports = router; 