const express = require('express');
const UserRoutes = require('./User-routes');
const JobRoutes = require('./Job-Routes');
const ApplicationRoutes = require('./application-routes');
const router = express.Router();

router.use('/user', UserRoutes);
router.use('/user', JobRoutes);
router.use('/user', ApplicationRoutes);

module.exports = router;
