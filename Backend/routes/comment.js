const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

//router.get('/', commentCtrl.getComments);
router.post('/', commentCtrl.createComment);
//router.put('/:id', commentCtrl.modifyComment);
//router.delete('/:id', commentCtrl.deleteComment);


module.exports = router;