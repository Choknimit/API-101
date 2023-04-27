const express = require('express');
const shopController = require('../controllers/shop-controller')

const router = express.Router()

router.get('/', shopController.shopAll)

// ? Menu
router.get('/menu', shopController.menu)

// ? get shop with menu
router.get('/:id', shopController.getShopWithMenu)


// ? insert shop
router.post('/', shopController.insertShop)


module.exports = router;