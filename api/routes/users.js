const express = require('express');
const router = express.Router();
const userCtrl = require('./../controllers/user');
const bodyParser = require('body-parser')
const auth = require('./../middleware/auth');


// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/signup', urlencodedParser, userCtrl.signup);
router.post('/login', urlencodedParser, userCtrl.login);

router.put('/:id/password', auth, urlencodedParser, userCtrl.updatPassword)

router.get('/:id/identity', auth, userCtrl.identity)

router.delete('/:id/delete', auth, userCtrl.delete)


module.exports = router;
