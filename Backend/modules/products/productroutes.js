const express = require('express');
const { addproduct, producttransaction, getAllProducts,addincart, getcartproductbyemail,deleteFromCart } = require('./productcontrollers');

const router = express.Router();

router.post('/addproduct', addproduct);
router.post('/addincart', addincart);
router.get('/cart/:email', getcartproductbyemail);
router.delete('/cartdelete/:email/:productId', deleteFromCart);

router.post('/producttransaction', producttransaction);

router.get('/products', getAllProducts);

module.exports = router;