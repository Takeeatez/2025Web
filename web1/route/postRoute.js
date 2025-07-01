const express = require('express');
const postController = require('../controller/postController.js');
// 로그인을 감지하는 미들웨어
const isLoggedIn = require('../util/authUtil.js');
const router = express.Router();

router.get('/posts', isLoggedIn, postController.getPosts);
router.get('/posts/:post_id', isLoggedIn, postController.getPost);
router.post('/posts', isLoggedIn, postController.writePost);
router.patch('/posts/:post_id', isLoggedIn, postController.updatePost);
router.delete('/posts/:post_id', isLoggedIn, postController.softDeletePost);

// 좋아요처리/취소
router.post('/posts/:post_id/like', isLoggedIn, postController.toggleLike); 
router.delete('/posts/:post_id/like', isLoggedIn, postController.toggleLike);

module.exports = router;