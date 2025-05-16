const express = require('express');
const checkToken = require('../middlewares/check-token');
const {
  userApplications,
  creatorApplications,
  apply,
} = require('../controllers/application-controllers');
const router = express.Router();

router.post('/application', checkToken(), apply);
router.get('/application/user', checkToken(), userApplications);
router.get('/application/creator', checkToken(), creatorApplications);

module.exports = router;
