const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/profil/:id', userCtrl.getOneUser);
router.put('/profil/:id', userCtrl.modifyUser);
router.delete('/profil/:id', userCtrl.deleteUser);

module.exports = router;