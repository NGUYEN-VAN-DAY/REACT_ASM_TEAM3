const CategoryModel = require('../models/categoryModel');

class CategoryController {

    static async get(req, res) {
        try {
            const categories = await CategoryModel.findAll();
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công",
                "data": categories
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "data": category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const { name, status, image } = req.body;
    
            // Kiểm tra xem các trường bắt buộc có được cung cấp không
            if (!name || !status || !image) {
                return res.status(400).json({ error: "Tên, trạng thái, và hình ảnh là bắt buộc" });
            }
    
            // Log thông tin body để kiểm tra
            console.log("Request Body:", req.body);
            
            // Tạo mới một danh mục trong cơ sở dữ liệu
            const category = await CategoryModel.create({
                name,
                status,
                image
            });
    
            res.status(201).json({
                message: "Thêm mới thành công",
                category
            });
        } catch (error) {
            console.error("Lỗi xảy ra:", error); // Log toàn bộ lỗi để kiểm tra
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            category.name = name;
            await category.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                category
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await category.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;
