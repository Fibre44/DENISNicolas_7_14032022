const express = require('express');
const router = express.Router();
const groupCtrl = require('./../controllers/group');
const bodyParser = require('body-parser');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', auth, groupCtrl.groups)
router.get('/:id/messages', auth, accessControl, groupCtrl.groupMessages)
router.get('/:id/message/:idMessage/comments', auth, accessControl, groupCtrl.groupComments)

router.post('/', auth, urlencodedParser, groupCtrl.create)

module.exports = router;
