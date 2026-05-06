const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('login ok'));
router.get('/register', (req, res) => res.send('register ok'));

module.exports = router;