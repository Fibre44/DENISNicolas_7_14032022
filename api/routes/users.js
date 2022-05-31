const express = require('express');
const router = express.Router();
const userCtrl = require('./../controllers/user');
const auth = require('./../middleware/auth');
const multer = require('./../middleware/multer-config');


router.post('/signup', userCtrl.signup);
router.post('/login', multer, userCtrl.login);

router.put('/password', auth, userCtrl.updatPassword)
router.put('/picture', auth, multer, userCtrl.picture)


router.get('/pictures', auth, userCtrl.getAllPictures)
router.get('/identity', auth, userCtrl.identity)
router.get('/picture', auth, userCtrl.getPicture)
router.get('/logout', userCtrl.logout)
router.delete('/delete', auth, userCtrl.delete)


module.exports = router;
