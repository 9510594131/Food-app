const express = require('express');
const { testusercontroller } = require('../controllers/testcontroller');

const router = express.Router();

router.get('/test',testusercontroller)


module.exports = router;