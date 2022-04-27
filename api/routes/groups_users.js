const express = require('express');
const router = express.Router();
const group_user = require('./../controllers/group_user');
const auth = require('./../middleware/auth');

router.post('/', auth, group_user.create)

router.get('/', auth, group_user.groupsByUser)

module.exports = router;
