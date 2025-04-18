import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
<<<<<<< HEAD
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Lấy chi tiết sản phẩm
    axios
      .get(`http://localhost:3000/products/list/${id}`)
      .then((response) => {
        const fetchedProduct = response.data?.data;
=======
  const product = {
    id: 1,
    name: "Xe máy honda",
    price: "30.000.000 VNĐ",
    salePrice: "300.000 VNĐ",
    description: "Xe máy Honda Xe máy Honda Xe máy Honda.",
    details: {
      type: "Đồ uống",
      brand: "Highlands Coffee",
      origin: "Việt Nam",
    },
    images: [
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Xe máy Yamaha",
      price: "30.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
    {
      id: 3,
      name: "Xe máy Suzuki",
      price: "32.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
    {
      id: 4,
      name: "Xe máy Kawasaki",
      price: "40.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
  ];
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61

        if (fetchedProduct) {
          const images = Array.isArray(fetchedProduct.images)
            ? fetchedProduct.images
            : [fetchedProduct.images];

          setProduct({
            ...fetchedProduct,
            details: fetchedProduct.details || {},
            images,
          });

          if (images.length > 0) {
            setMainImage(images[0]);
          }
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
      });

    // Lấy danh sách sản phẩm liên quan
    axios
      .get("http://localhost:3000/products/list")
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm liên quan:", error);
      });
  }, [id]);

  if (!product) {
    return <p>Đang tải dữ liệu sản phẩm...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh chính */}
        <div className="col-md-6">
          <img
            src={`http://localhost:3000/uploads/${mainImage}`}
            alt="Ảnh sản phẩm"
            className="img-fluid rounded"
            style={{ width: "100%" }}
          />
          <div className="d-flex mt-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/${img}`}
                alt={`Ảnh ${index + 1}`}
                className="img-thumbnail me-2"
                style={{ width: "70px", height: "50px", cursor: "pointer" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-success">
            <strong>Giá:</strong> {product.price} VNĐ
          </p>
          <p className="text-danger">
            <strong>Giá khuyến mãi:</strong> {product.salePrice} VNĐ
          </p>
          <p>
            <strong>Loại sản phẩm:</strong>{" "}
            {product.details?.type || "Không có"}
          </p>
          <p>
            <strong>Hãng:</strong> {product.details?.brand || "Không có"}
          </p>
          <p>
            <strong>Xuất xứ:</strong> {product.details?.origin || "Không có"}
          </p>
          <p>
            <strong>Mô tả:</strong> {product.description}
          </p>
          <button className="btn btn-success">Đặt hàng ngay</button>
        </div>
      </div>

      {/* Sản phẩm liên quan (tùy chọn) */}
      {/* 
      <div className="mt-5">
        <h3>Sản phẩm liên quan</h3>
        <div className="row">
          {products.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={
                    item.image
                      ? `http://localhost:3000/uploads/${item.image}`
                      : item.images?.[0]
                      ? `http://localhost:3000/uploads/${item.images[0]}`
                      : ""
                  }
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text text-danger">
                    <strong>{item.price} VNĐ</strong>
                  </p>
                  <button className="btn btn-success">Xem chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      */}
=======
      <br></br>
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
    </div>
    
  );
};

export default ProductDetail;
