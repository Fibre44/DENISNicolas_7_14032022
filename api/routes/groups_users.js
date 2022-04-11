const express = require('express');
const router = express.Router();
const group_user = require('./../controllers/group_user');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', auth, urlencodedParser, group_user.create)

router.get('/', auth, group_user.groupsByUser)

module.exports = router;
