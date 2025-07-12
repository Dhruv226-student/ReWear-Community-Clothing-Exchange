const express = require('express');
const authRoutes = require('./auth.route');
const itemRoutes = require('./item.route');

const router = express.Router();

router.use('/auth', authRoutes); // Auth routes.
router.use('/item', itemRoutes); // Item routes.

module.exports = router;
