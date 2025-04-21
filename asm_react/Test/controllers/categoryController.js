const CategoryModel = require('../models/categoryModel');
const path = require('path');  // Thêm dòng này vào đầu file của bạn
const fs = require('fs');
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
            const { name, status, description } = req.body;


            const image = req.file?.filename; // nếu upload qua multer
            console.log("data", req.body, image);


            const newCategory = await CategoryModel.create({
                name,
                status,
                description,
                image,
            });

            res.status(201).json({
                message: "Thêm danh mục thành công!",
                data: newCategory,
            });
        } catch (err) {
            console.error("Lỗi tạo danh mục:", err);
            res.status(500).json({ error: "Lỗi máy chủ!" });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, status, description } = req.body;

            // Kiểm tra xem có file ảnh không
            let image = req.file ? req.file.filename : null;

            // Tìm danh mục cần cập nhật
            const category = await CategoryModel.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: "Danh mục không tồn tại!" });
            }

            // Nếu có ảnh mới, xóa ảnh cũ (nếu có)
            if (image && category.image) {
                const oldImagePath = path.join(__dirname, "..", "uploads", category.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Xóa ảnh cũ
                }
            }

            // Cập nhật danh mục
            await category.update({
                name,
                status,
                description,
                image: image || category.image, // Nếu không có ảnh mới, giữ nguyên ảnh cũ
            });

            res.status(200).json({ message: "Cập nhật danh mục thành công!" });
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
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
