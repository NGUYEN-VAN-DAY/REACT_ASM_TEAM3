const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

class CartController {
  // Middleware kiểm tra đăng nhập
  static checkAuth(req, res, next) {
    if (!req.session || !req.session.user) {
      return res
        .status(401)
        .json({ message: "Vui lòng đăng nhập để tiếp tục!" });
    }
    next();
  }

  // Lấy giỏ hàng của người dùng
  static async getCart(req, res) {
    try {
      const userId = req.session.user.id;

      // Lấy giỏ hàng với thông tin sản phẩm
      const cartItems = await Cart.findAll({
        where: {
          user_id: userId,
        },
        include: [
          {
            model: Product,
            attributes: ["id", "title", "images", "price", "salePrice"],
          },
        ],
      });

      // Tính tổng tiền
      let totalPrice = 0;
      const formattedCartItems = cartItems.map((item) => {
        const itemData = item.toJSON();

        // Kiểm tra sự tồn tại của sản phẩm (Sequelize trả về Product viết hoa)
        if (!item.Product) {
          console.error(
            `Sản phẩm không tồn tại cho mục giỏ hàng ID: ${item.id}`
          );
          // Trả về dữ liệu cơ bản nếu không có sản phẩm
          return {
            ...itemData,
            totalPrice: 0,
          };
        }

        // Sử dụng giá khuyến mãi nếu có
        const itemPrice =
          item.Product.salePrice > 0
            ? item.Product.salePrice
            : item.Product.price;
        const itemTotal = itemPrice * item.quantity;
        totalPrice += itemTotal;

        return {
          ...itemData,
          totalPrice: itemTotal,
        };
      });

      res.status(200).json({
        status: 200,
        message: "Lấy giỏ hàng thành công",
        data: formattedCartItems,
        totalPrice: totalPrice,
      });
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addToCart(req, res) {
    try {
      const userId = req.session.user.id;
      const { productId, quantity, price } = req.body;

      if (!productId || !quantity || !price) {
        return res.status(400).json({
          error: "Vui lòng cung cấp đầy đủ thông tin sản phẩm",
        });
      }

      // Kiểm tra sản phẩm có tồn tại
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      let cartItem = await Cart.findOne({
        where: {
          user_id: userId,
          product_id: productId,
        },
      });

      // Nếu đã có, cập nhật số lượng
      if (cartItem) {
        cartItem.quantity += parseInt(quantity);
        await cartItem.save();

        return res.status(200).json({
          message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công",
          cartItem,
        });
      }

      // Nếu chưa có, thêm mới
      cartItem = await Cart.create({
        user_id: userId,
        product_id: productId,
        quantity: quantity,
        price: price,
      });

      res.status(201).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        cartItem,
      });
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateCartItem(req, res) {
    try {
      const userId = req.session.user.id;
      const { cartId } = req.params;
      const { quantity } = req.body;

      if (!quantity) {
        return res.status(400).json({
          error: "Vui lòng cung cấp số lượng",
        });
      }

      const cartItem = await Cart.findOne({
        where: {
          id: cartId,
          user_id: userId,
        },
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
      }

      // Cập nhật số lượng
      cartItem.quantity = parseInt(quantity);
      await cartItem.save();

      res.status(200).json({
        message: "Cập nhật số lượng thành công",
        cartItem,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeFromCart(req, res) {
    try {
      const userId = req.session.user.id;
      const { cartId } = req.params;

      const cartItem = await Cart.findOne({
        where: {
          id: cartId,
          user_id: userId,
        },
      });

      if (!cartItem) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
      }

      // Xóa mục khỏi giỏ hàng
      await cartItem.destroy();

      res.status(200).json({
        message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      });
    } catch (error) {
      console.error("Lỗi khi xóa khỏi giỏ hàng:", error);
      res.status(500).json({ error: error.message });
    }
  }

  // Xóa toàn bộ giỏ hàng
  static async clearCart(req, res) {
    try {
      const userId = req.session.user.id;

      // Xóa tất cả các mục trong giỏ hàng
      await Cart.destroy({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json({
        message: "Xóa giỏ hàng thành công",
      });
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CartController;
