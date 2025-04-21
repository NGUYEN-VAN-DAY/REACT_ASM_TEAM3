const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRouters");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");

// Cấu hình session
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 1 ngày
  })
);

// Tạo thư mục public/images nếu chưa tồn tại
const imageDir = path.join(__dirname, "public/images");
app.use("/public/images", express.static(path.join(__dirname, "images")));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

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

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Cho phép gửi cookies qua CORS
  })
);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(categoryRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

// Upload route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Không có file nào được upload" });
  }

  // Trả về đường dẫn file
  const filePath = req.file.path.replace(/\\/g, "/").replace("public/", "");
  res.status(200).json({
    message: "Upload thành công",
    filePath: filePath,
  });
});

app.listen(port, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
