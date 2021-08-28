const PurchaseController = require('../../controllers/purchase');
const router = require('express').Router();

router.put('/item',PurchaseController.purchaseItem);

module.exports = router;