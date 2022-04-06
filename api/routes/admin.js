const express = require('express');
const router = express.Router();
const adminCTRL = require('./../controllers/admin');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');
const accessAdmin = require('../middleware/acces-admin');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', auth, accessAdmin, adminCTRL.home)

module.exports = router;
