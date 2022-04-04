const express = require('express');
const router = express.Router();
const groupCtrl = require('./../controllers/group');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/all', auth, groupCtrl.groups)
router.get('/:id/messages', auth, groupCtrl.groupMessages)

router.post('/', auth, urlencodedParser, groupCtrl.create)

module.exports = router;
