const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.post('/', postCtrl.newPost);

module.exports = router;