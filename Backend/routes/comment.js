const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;