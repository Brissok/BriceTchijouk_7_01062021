const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const limitLog = require('../middleware/limitLog');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', limitLog, userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/profil/:id', auth, userCtrl.getOneUser);
router.put('/profil/:id', auth, userCtrl.modifyUser);
router.delete('/profil/:id', auth, userCtrl.deleteUser);

module.exports = router;