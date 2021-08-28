const router = require('express').Router();

const Purchase = require('./purchase');
const User = require('./user');

router.use('/user',User);
router.use('/purchase',Purchase);

module.exports = router;