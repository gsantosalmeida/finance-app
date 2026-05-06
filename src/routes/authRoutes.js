const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');

router.get('/auth/login', authController.showLogin);
router.post('/auth/login', authController.authLogin);

router.get('/auth/register', authController.showRegister);
router.post('/auth/register', authController.authRegister);

router.get('/auth/logout', authController.authLogout);

module.exports = router;