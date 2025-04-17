const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/products/list', ProductController.get);
router.get('/products/list/:id', ProductController.getById);
router.post('/products/add', ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);

module.exports = router;
