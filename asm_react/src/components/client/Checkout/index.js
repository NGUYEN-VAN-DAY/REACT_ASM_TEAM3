import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  isAuthenticated,
  getUser,
  getCart,
  clearCart,
  calculateCartTotal,
} from "../../../utils/auth";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "cod",
  });

  // Kiểm tra đăng nhập và lấy thông tin giỏ hàng
  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated()) {
        toast.error("Vui lòng đăng nhập để tiếp tục thanh toán");
        navigate("/login");
        return;
      }

      try {
        // Lấy thông tin giỏ hàng từ API
        const cart = await getCart();
        if (!cart || cart.length === 0) {
          toast.info("Giỏ hàng của bạn đang trống");
          navigate("/cart");
          return;
        }

        setCartItems(cart);
        setTotalPrice(calculateCartTotal(cart));

        // Tự động điền thông tin người dùng nếu có
        const user = getUser();
        if (user) {
          setFormData((prevState) => ({
            ...prevState,
            fullName: user.fullName || user.name || user.username || "",
            email: user.email || "",
            phone: user.phone || "",
          }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin giỏ hàng:", error);
        toast.error("Không thể tải thông tin giỏ hàng. Vui lòng thử lại.");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    setSubmitting(true);

    try {
      // Chuẩn bị dữ liệu đơn hàng
      const orderData = {
        user: getUser().id,
        items: cartItems.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingDetails: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
        notes: formData.notes,
        paymentMethod: formData.paymentMethod,
        totalAmount: totalPrice,
      };

      // Gửi đơn hàng đến API
      const response = await axios.post(
        "http://localhost:3000/orders/create",
        orderData,
        {
          withCredentials: true,
        }
      );

      // Xử lý khi đặt hàng thành công
      toast.success("Đặt hàng thành công!");
      clearCart();

      // Chuyển đến trang xác nhận đơn hàng
      setTimeout(() => {
        navigate(`/order-confirmation/${response.data.orderId}`);
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-3">Thanh Toán</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/cart">Giỏ hàng</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        {/* Thông tin thanh toán */}
        <div className="col-lg-8">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Thông tin giao hàng</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className="form-label">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="notes" className="form-label">
                      Ghi chú đơn hàng (không bắt buộc)
                    </label>
                    <textarea
                      className="form-control"
                      id="notes"
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4">
                  <h5>Phương thức thanh toán</h5>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="banking"
                      value="banking"
                      checked={formData.paymentMethod === "banking"}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="banking">
                      Chuyển khoản ngân hàng
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="col-lg-4">
          <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Tóm tắt đơn hàng</h5>
            </div>
            <div className="card-body">
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          item.product.imageUrl ||
                          `http://localhost:3000/images/${item.product.images}`
                        }
                        alt={item.product.title}
                        className="img-thumbnail me-2"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <p className="mb-0 fw-bold">{item.product.title}</p>
                        <small className="text-muted">
                          {parseInt(item.price).toLocaleString("vi-VN")} VNĐ x{" "}
                          {item.quantity}
                        </small>
                      </div>
                    </div>
                    <p className="mb-0 text-end">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span>
                <span>{parseInt(totalPrice).toLocaleString("vi-VN")} VNĐ</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top">
                <span>Tổng tiền:</span>
                <span className="text-danger fs-5">
                  {parseInt(totalPrice).toLocaleString("vi-VN")} VNĐ
                </span>
              </div>

              <button
                type="button"
                className="btn btn-success w-100 mt-4"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Đang xử lý...
                  </>
                ) : (
                  "Hoàn tất đặt hàng"
                )}
              </button>

              <div className="text-center mt-3">
                <Link to="/cart" className="text-decoration-none">
                  <i className="fas fa-arrow-left me-1"></i> Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
