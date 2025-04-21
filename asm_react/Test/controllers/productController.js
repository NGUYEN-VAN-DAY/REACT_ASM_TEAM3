const Product = require("../models/productModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

class ProductController {
  static async get(req, res) {
    try {
      const products = await Product.findAll();

      // Chuyển đổi mảng sản phẩm để thêm đường dẫn ảnh đầy đủ
      const productsWithFullImagePath = products.map((product) => {
        const productData = product.toJSON();
        productData.imageUrl = `http://localhost:3000/images/${productData.images}`;
        return productData;
      });

      res.status(200).json({
        status: 200,
        message: "Lấy danh sách sản phẩm thành công",
        data: productsWithFullImagePath,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Id sản phẩm không tồn tại" });
      }

      // Chuyển đổi sản phẩm để thêm đường dẫn ảnh đầy đủ
      const productData = product.toJSON();
      productData.imageUrl = `http://localhost:3000/images/${productData.images}`;

      res.status(200).json({
        status: 200,
        data: productData,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const {
        title,
        description,
        price,
        salePrice,
        longDescription,
        status,
        category_id,
      } = req.body;
      let images = "default.jpg"; // Giá trị mặc định nếu không có file

      // Kiểm tra xem các trường bắt buộc có được cung cấp không
      if (!title || !description || !price || !status || !category_id) {
        return res.status(400).json({
          error:
            "Các trường title, description, price, status, và category_id là bắt buộc",
        });
      }

      // Kiểm tra xem có file ảnh được upload không
      if (req.file) {
        images = req.file.filename;
      }

      // Log thông tin body để kiểm tra
      console.log("Request Body:", req.body);

      // Tạo mới một sản phẩm trong cơ sở dữ liệu
      const product = await Product.create({
        title,
        description,
        images,
        price,
        salePrice,
        longDescription,
        status,
        category_id,
      });

      res.status(201).json({
        message: "Thêm mới sản phẩm thành công",
        product,
      });
    } catch (error) {
      console.error("Lỗi xảy ra:", error); // Log toàn bộ lỗi để kiểm tra
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        price,
        salePrice,
        longDescription,
        status,
        category_id,
      } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Id sản phẩm không tồn tại" });
      }

      // Cập nhật các trường
      product.title = title;
      product.description = description;
      product.price = price;
      product.salePrice = salePrice;
      product.longDescription = longDescription;
      product.status = status;
      product.category_id = category_id;

      // Xử lý file ảnh nếu có
      if (req.file) {
        // Xóa ảnh cũ nếu không phải ảnh mặc định
        if (product.images !== "default.jpg") {
          const oldImagePath = path.join(
            __dirname,
            "../public/images",
            product.images
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        product.images = req.file.filename;
      }

      await product.save();

      res.status(200).json({
        message: "Cập nhật sản phẩm thành công",
        product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Id sản phẩm không tồn tại" });
      }

      // Xóa file ảnh nếu không phải ảnh mặc định
      if (product.images !== "default.jpg") {
        const imagePath = path.join(
          __dirname,
          "../public/images",
          product.images
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await product.destroy();

      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
