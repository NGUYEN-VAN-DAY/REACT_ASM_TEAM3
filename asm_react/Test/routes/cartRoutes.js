const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");

// Middleware kiểm tra đăng nhập cho tất cả các routes của giỏ hàng
router.use("/cart", CartController.checkAuth);

// Lấy giỏ hàng của người dùng
router.get("/cart", CartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post("/cart/add", CartController.addToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/cart/:cartId", CartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/cart/:cartId", CartController.removeFromCart);

// Xóa toàn bộ giỏ hàng
router.delete("/cart", CartController.clearCart);

module.exports = router;
