const express = require('express');
const router = express.Router();
const userCtrl = require('./../controllers/user');
const auth = require('./../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/password', auth, userCtrl.updatPassword)

router.get('/identity', auth, userCtrl.identity)

router.delete('/delete', auth, userCtrl.delete)


module.exports = router;
