import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthenticated, addToCart } from "../../../utils/auth";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Kiểm tra người dùng đã đăng nhập chưa
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  useEffect(() => {
    // Lấy chi tiết sản phẩm
    axios
      .get(`http://localhost:3000/products/list/${id}`)
      .then((response) => {
        const fetchedProduct = response.data?.data;

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
        toast.error("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setIsLoading(true);

    try {
      // Tính giá (ưu tiên giá khuyến mãi nếu có)
      const price = product.salePrice > 0 ? product.salePrice : product.price;

      // Sử dụng utility để thêm vào giỏ hàng
      await addToCart(product, quantity, price);
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error(
        error.message || "Không thể thêm vào giỏ hàng. Vui lòng thử lại!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        {/* Hình ảnh chính */}
        <div className="col-md-6">
          <img
            src={
              product.imageUrl || `http://localhost:3000/images/${mainImage}`
            }
            alt="Ảnh sản phẩm"
            className="img-fluid rounded"
            style={{ width: "100%" }}
          />
          <div className="d-flex mt-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000/images/${img}`}
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
            <strong>Giá:</strong>{" "}
            {parseInt(product.price).toLocaleString("vi-VN")} VNĐ
          </p>
          {product.salePrice > 0 && (
            <p className="text-danger">
              <strong>Giá khuyến mãi:</strong>{" "}
              {parseInt(product.salePrice).toLocaleString("vi-VN")} VNĐ
            </p>
          )}
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

          <div className="mb-3">
            <div className="input-group" style={{ maxWidth: "200px" }}>
              <span className="input-group-text">Số lượng</span>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
          </div>

          <button
            className="btn btn-success btn-lg"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Thêm vào giỏ hàng"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
