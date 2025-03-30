import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const product = {
    id: 1,
    name: "Xe máy Honda",
    price: 30000000, // Để dạng số thay vì chuỗi để tính toán
    salePrice: 300000, // Để dạng số thay vì chuỗi
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Giỏ Hàng</h2>
      {product.images.length === 0 ? (
        <p className="text-muted">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <table className="table table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Khuyến mãi</th>
              <th>Mô tả</th>
            </tr>
          </thead>
          <tbody>
            {product.images.map((image, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={image} alt={product.name} width="80" height="80" className="rounded" />
                </td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VNĐ</td>
                <td>-{product.salePrice.toLocaleString()} VNĐ</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="d-flex justify-content-between mt-4">
        <Link to="/shop" className="btn btn-outline-primary">Tiếp tục mua sắm</Link>
        {product.images.length > 0 && (
          <button className="btn btn-success">Thanh toán</button>
        )}
      </div>
    </div>
  );
};

export default Cart;
