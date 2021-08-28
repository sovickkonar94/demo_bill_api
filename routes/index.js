const router = require('express').Router();
const Debit = require('./debit');
const Credit = require('./credit');
const User = require('./user');

router.use('/user',User);
router.use('/debit',Debit);
router.use('/credit',Credit);

module.exports = router;