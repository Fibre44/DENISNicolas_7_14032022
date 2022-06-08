const express = require('express');
const router = express.Router();
const adminCTRL = require('./../controllers/admin');
const auth = require('./../middleware/auth');
const accessAdmin = require('../middleware/acces-admin');
const accesAdmin = require('../middleware/acces-admin');
const multer = require('./../middleware/multer-config');

router.get('/messages', auth, accessAdmin, adminCTRL.allMessages)
router.get('/comments', auth, accessAdmin, adminCTRL.allComments)

router.delete('/message/:id', auth, accesAdmin, adminCTRL.deleteMessage)
router.delete('/comment/:id', auth, accesAdmin, adminCTRL.deleteComment)

router.post('/add', multer, auth, accesAdmin, adminCTRL.addAdmin)

module.exports = router;
