const express = require('express');
const checkToken = require('../middlewares/check-token');
const {
  create,
  jobs,
  remove,
  edit,
  jobsbyid,
} = require('../controllers/job-controller');
const router = express.Router();

router.post('/jobs', checkToken(), create);
router.get('/jobs', jobs);
router.patch('/jobs/:id', checkToken(), edit);
router.get('/jobs/:id', checkToken(), jobsbyid);
router.delete('/jobs/:id', checkToken(), remove);

module.exports = router;
