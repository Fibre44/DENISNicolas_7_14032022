const express = require('express');
const router = express.Router();
const commentCtrl = require('./../controllers/comment');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', auth, urlencodedParser, commentCtrl.create)

module.exports = router;
