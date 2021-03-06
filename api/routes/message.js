const express = require('express');
const router = express.Router();
const messageCtrl = require('./../controllers/message');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');
const multer = require('./../middleware/multer-config');

router.post('/', auth, multer, accessControl, messageCtrl.create)

router.put('/:idMessage', auth, accessControl, messageCtrl.edit)

router.delete('/:idMessage', auth, accessControl, messageCtrl.delete)

module.exports = router; 