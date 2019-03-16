const router = require('express').Router();
const { postController } = require('../controllers');

module.exports = router
  .post('/new/post', postController.addPost)
  .get('/', postController.getAllPosts);