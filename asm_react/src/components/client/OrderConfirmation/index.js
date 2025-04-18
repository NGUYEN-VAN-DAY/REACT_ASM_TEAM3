import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { isAuthenticated } from "../../../utils/auth";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kiểm tra đăng nhập
    if (!isAuthenticated()) {
      toast.error("Vui lòng đăng nhập để xem đơn hàng");
      navigate("/login");
      return;
    }

    // Lấy thông tin đơn hàng
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderId}`,
          {
            withCredentials: true,
          }
        );

        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Có lỗi xảy ra!</h4>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-outline-primary me-2">
              Về trang chủ
            </Link>
            <Link to="/profile/orders" className="btn btn-primary">
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Không tìm thấy đơn hàng</h4>
          <p>
            Đơn hàng bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền
            truy cập.
          </p>
          <hr />
          <div className="d-flex justify-content-center">
            <Link to="/" className="btn btn-outline-primary me-2">
              Về trang chủ
            </Link>
            <Link to="/profile/orders" className="btn btn-primary">
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="text-center mb-5">
        <div className="mb-4">
          <i
            className="fas fa-check-circle text-success"
            style={{ fontSize: "5rem" }}
          ></i>
        </div>
        <h1 className="mb-3">Đặt hàng thành công!</h1>
        <p className="lead">
          Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận và đang được
          xử lý.
        </p>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Thông tin đơn hàng #{order.orderNumber || orderId}
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-muted mb-3">Thông tin giao hàng</h5>
                  <p className="mb-1">
                    <strong>Người nhận:</strong>{" "}
                    {order.shippingDetails?.fullName}
                  </p>
                  <p className="mb-1">
                    <strong>Email:</strong> {order.shippingDetails?.email}
                  </p>
                  <p className="mb-1">
                    <strong>Số điện thoại:</strong>{" "}
                    {order.shippingDetails?.phone}
                  </p>
                  <p className="mb-1">
                    <strong>Địa chỉ:</strong> {order.shippingDetails?.address},{" "}
                    {order.shippingDetails?.city}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5 className="text-muted mb-3">Chi tiết thanh toán</h5>
                  <p className="mb-1">
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {order.paymentMethod === "cod"
                      ? "Thanh toán khi nhận hàng (COD)"
                      : "Chuyển khoản ngân hàng"}
                  </p>
                  <p className="mb-1">
                    <strong>Trạng thái đơn hàng:</strong>{" "}
                    <span className="badge bg-warning">
                      {order.status || "Đang xử lý"}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Ngày đặt hàng:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <h5 className="text-muted mb-3">Sản phẩm đã đặt</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>Sản phẩm</th>
                      <th className="text-center">Giá</th>
                      <th className="text-center">Số lượng</th>
                      <th className="text-end">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            {item.product?.images && (
                              <img
                                src={`http://localhost:3000/images/${item.product.images}`}
                                alt={item.product?.title}
                                className="img-thumbnail me-2"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                            <div>
                              {item.product?.title || "Sản phẩm"}
                              {item.product?.id && (
                                <div>
                                  <small className="text-muted">
                                    <Link to={`/product/${item.product.id}`}>
                                      Xem sản phẩm
                                    </Link>
                                  </small>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          {parseInt(item.price).toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-light">
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Tạm tính:</strong>
                      </td>
                      <td className="text-end">
                        {parseInt(order.totalAmount).toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Phí vận chuyển:</strong>
                      </td>
                      <td className="text-end">Miễn phí</td>
                    </tr>
                    <tr>
                      <td colSpan="3" className="text-end">
                        <strong>Tổng cộng:</strong>
                      </td>
                      <td className="text-end">
                        <strong className="text-danger fs-5">
                          {parseInt(order.totalAmount).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {order.notes && (
                <div className="alert alert-info mt-3" role="alert">
                  <strong>Ghi chú:</strong> {order.notes}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/" className="btn btn-outline-success">
              <i className="fas fa-home me-2"></i>
              Tiếp tục mua sắm
            </Link>
            <Link to="/profile/orders" className="btn btn-success">
              <i className="fas fa-list me-2"></i>
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
