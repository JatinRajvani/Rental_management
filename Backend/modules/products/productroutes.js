const express = require('express');
const { addproduct, producttransaction, getAllProducts,addincart, getProductById } = require('./productcontrollers');

const router = express.Router();

router.post('/addproduct', addproduct);
router.post('/addincart', addincart);
router.get("/products/:id", getProductById); 

router.post('/producttransaction', producttransaction);

router.get('/products', getAllProducts);

module.exports = router;
