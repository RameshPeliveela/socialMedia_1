const express = require('express')

const {createPost, getPost, updatePost, deletePost, likeOrDislike, getTimeLinePosts} = require('../Controllers/postController')

const router = express.Router();

router.post('/create-post', createPost);
router.get('/get-post/:postid', getPost);
router.put('/update-post/:postid', updatePost);
router.delete('/delete-post/:postid', deletePost);
router.post('/like-or-dislike/:postid', likeOrDislike);
router.post('/time-line-posts', getTimeLinePosts);

module.exports = router;
