const express = require('express');
const multer = require('multer');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { addProduct, getProductByVendor, getAllProduct } = require('../controller/vendorController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();


router.route("/product").get(getAllProduct);

router.route("/vendor")
    .post(isAuthenticatedUser, authorizeRoles("vendor"),upload.single('image'), addProduct)
    .get(isAuthenticatedUser, authorizeRoles("vendor"), getProductByVendor);


module.exports = router;