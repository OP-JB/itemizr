const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/vendors', require('./vendors'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/categories', require('./categories'));
router.use('/units', require('./units'));

module.exports = router;
