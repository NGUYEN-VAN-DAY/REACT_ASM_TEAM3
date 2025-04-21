const express = require('express');
const path = require('path'); // Thêm dòng này
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const multer = require('multer');
router.get('/categories/list', CategoryController.get);
// router.post('/categories/add', CategoryController.create);
router.delete("/categories/:id", CategoryController.delete);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  router.get("/categories/:id",  CategoryController.getById);
  
  // Route xử lý form có file upload
  router.post("/categories/add", upload.single("image"), CategoryController.create);
router.put("/categories/:id", upload.single("image"), CategoryController.update);

module.exports = router;