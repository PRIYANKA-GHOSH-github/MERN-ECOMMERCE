const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  addRecentlyViewedProduct,
  getRecentlyViewedProducts,
} = require("../../controllers/shop/products-controller");
const { authMiddleware } = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.post("/:id/viewed", authMiddleware, addRecentlyViewedProduct);
router.get("/recently-viewed", authMiddleware, getRecentlyViewedProducts);

module.exports = router;
