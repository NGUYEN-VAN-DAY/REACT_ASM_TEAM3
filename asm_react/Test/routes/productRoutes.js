const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

// Cấu hình multer để lưu file vào thư mục public/images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    // Tạo tên file không trùng lặp bằng timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Filter chỉ cho phép upload file hình ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file hình ảnh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // giới hạn kích thước file 5MB
  },
});

router.get("/products/list", ProductController.get);
router.get("/products/list/:id", ProductController.getById);
router.post(
  "/products/add",
  upload.single("productImage"),
  ProductController.create
);
router.put(
  "/products/:id",
  upload.single("productImage"),
  ProductController.update
);
router.delete("/products/:id", ProductController.delete);

module.exports = router;
