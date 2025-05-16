const express = require('express');
const { signup, login, getbyid } = require('../controllers/user-controller');
const router = express.Router();
console.log('User routes working');
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile/:id', getbyid);

module.exports = router;
