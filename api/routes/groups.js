const express = require('express');
const router = express.Router();
const groupCtrl = require('./../controllers/group');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');
const multer = require('./../middleware/multer-config');

router.get('/', auth, groupCtrl.groups)
router.get('/:id', auth, accessControl, groupCtrl.getGroupeDescription)
router.get('/:id/messages', auth, accessControl, groupCtrl.groupMessages)
router.get('/:id/message/:idMessage/comments', auth, accessControl, groupCtrl.groupComments)

router.post('/', auth, multer, groupCtrl.create)

module.exports = router;
