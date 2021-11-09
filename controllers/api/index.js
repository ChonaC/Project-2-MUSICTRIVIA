const router = require('express').Router();
const userRoutes = require('./userRoutes');
const songRoutes = require('./song-routes');


router.use('/songs', songRoutes);
router.use('/users', userRoutes);

module.exports = router;
