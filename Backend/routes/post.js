const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.createPost);


module.exports = router;