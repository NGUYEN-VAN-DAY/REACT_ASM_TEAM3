const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRouters');
const productRoutes = require('./routes/productRoutes');
app.use(express.json())
const bodyParser = require('body-parser');



const path = require('path');

app.use(cors()); 

app.use(bodyParser.json()); // NHẬN DỮ LIỆU TỪ FORM JSON
app.use(bodyParser.urlencoded({ extended: true })); // NHẬN DŨ LIỆU WWWW-FROM-URLENCODED
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');


// Cấu hình nơi lưu file upload
const storage = multer.memoryStorage(); // Hoặc dùng diskStorage nếu muốn lưu file vào ổ đĩa
const upload = multer({ storage: storage });



app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

app.use(categoryRoutes);
app.use(userRoutes);
app.use(productRoutes);

app.listen(port, () => {
    console.log('http://localhost:3000');
})