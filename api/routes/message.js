const express = require('express');
const router = express.Router();
const messageCtrl = require('./../controllers/message');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');

router.post('/', auth, accessControl, messageCtrl.create)

router.put('/:idMessage', auth, accessControl, messageCtrl.edit)

router.delete('/:idMessage', auth, accessControl, messageCtrl.delete)

module.exports = router; 