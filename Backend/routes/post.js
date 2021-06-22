const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, postCtrl.createPost);


module.exports = router;