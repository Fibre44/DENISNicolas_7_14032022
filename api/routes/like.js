const express = require('express');
const router = express.Router();
const likeCtrl = require('./../controllers/like');
const auth = require('./../middleware/auth');
const accessControl = require('../middleware/acces-control');

router.post('/', auth, accessControl, likeCtrl.create)
router.get('/:type/:id/user', auth, accessControl, likeCtrl.userLike)
router.get('/:type/:id', auth, accessControl, likeCtrl.groupLikes)

module.exports = router; 