const router = require('express').Router();
const apiRouter = require('express').Router();

const authRoutes = require('./auth.routes');
const postRoutes = require('./post.routes');
// const bookRoutes = require('./book.routes');
const catchAll = require('./catch-all.routes');

router.use('/auth', authRoutes).use('/post', postRoutes);

module.exports = apiRouter.use('/api', router).use(catchAll);