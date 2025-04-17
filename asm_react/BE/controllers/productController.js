const Product = require('../models/productModel');

class ProductController {

    static async get(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách sản phẩm thành công",
                "data": products
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

            res.status(200).json({
                "status": 200,
                "data": product
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { title, description, images, price, salePrice, longDescription, status, category_id } = req.body;
    
            // Kiểm tra xem các trường bắt buộc có được cung cấp không
            if (!title || !description || !images || !price || !status || !category_id) {
                return res.status(400).json({ error: "Các trường title, description, images, price, status, và category_id là bắt buộc" });
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
                category_id
            });
    
            res.status(201).json({
                message: "Thêm mới sản phẩm thành công",
                product
            });
        } catch (error) {
            console.error("Lỗi xảy ra:", error); // Log toàn bộ lỗi để kiểm tra
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, images, price, salePrice, longDescription, status, category_id } = req.body;

            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Id sản phẩm không tồn tại" });
            }

            product.title = title;
            product.description = description;
            product.images = images;
            product.price = price;
            product.salePrice = salePrice;
            product.longDescription = longDescription;
            product.status = status;
            product.category_id = category_id;

            await product.save();

            res.status(200).json({
                message: "Cập nhật sản phẩm thành công",
                product
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

            await product.destroy();

            res.status(200).json({ message: "Xóa sản phẩm thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;
