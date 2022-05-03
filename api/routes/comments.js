const express = require('express');
const router = express.Router();
const commentCtrl = require('./../controllers/comment');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');

router.post('/', auth, accessControl, commentCtrl.create)
router.delete('/:idComment', auth, accessControl, commentCtrl.delete)
router.put('/:idComment', auth, accessControl, commentCtrl.edit)

module.exports = router;
