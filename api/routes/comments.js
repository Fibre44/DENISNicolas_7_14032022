const express = require('express');
const router = express.Router();
const commentCtrl = require('./../controllers/comment');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', auth, urlencodedParser, accessControl, commentCtrl.create)
router.delete('/:idComment', auth, urlencodedParser, accessControl, commentCtrl.delete)

module.exports = router;
