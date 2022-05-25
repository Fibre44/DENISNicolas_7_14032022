const express = require('express');
const router = express.Router();
const inviteCtrl = require('./../controllers/invite');
const auth = require('./../middleware/auth');

router.post('/', auth, inviteCtrl.create)
router.post('/:id/accept', auth, inviteCtrl.accept)
router.get('/', auth, inviteCtrl.getAll)
router.get('/count', auth, inviteCtrl.count)
router.delete('/:id/refuse', auth, inviteCtrl.delete)


module.exports = router; 