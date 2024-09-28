const express = require('express');
const {getUser, updateUser, deleteUser, followingController, unfollowController} = require('../Controllers/userController')
const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/follow/:id', followingController)
router.post('/unfollow/:id', unfollowController)


module.exports = router;
