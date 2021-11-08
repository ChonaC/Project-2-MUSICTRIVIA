const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/MusicTriviaApi', apiRoutes);

module.exports = router;