const express = require('express');
const router = express.Router();
const messageCtrl = require('./../controllers/message');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/create',auth,urlencodedParser,messageCtrl.create)

module.exports = router; 