import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  isAuthenticated,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  calculateCartTotal,
} from "../../../utils/auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra đăng nhập và tải giỏ hàng
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        await loadCart();
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Tải giỏ hàng từ API
  const loadCart = async () => {
    try {
      setLoading(true);
      const cart = await getCart();
      setCartItems(cart);
      setTotalPrice(calculateCartTotal(cart));
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      toast.error("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  // Xử lý cập nhật số lượng
  const handleUpdateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await updateCartQuantity(cartId, newQuantity);
      toast.success("Cập nhật số lượng thành công");
      await loadCart(); // Tải lại giỏ hàng
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
      toast.error(error.message || "Không thể cập nhật số lượng");
    }
  };

  // Xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (cartId) => {
    if (
      !window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      return;
    }

    try {
      await removeFromCart(cartId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
      await loadCart(); // Tải lại giỏ hàng
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error(error.message || "Không thể xóa sản phẩm");
    }
  };

  // Xử lý xóa toàn bộ giỏ hàng
  const handleClearCart = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      return;
    }

    try {
      await clearCart();
      setCartItems([]);
      setTotalPrice(0);
      toast.success("Đã xóa toàn bộ giỏ hàng");
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      toast.error("Không thể xóa giỏ hàng");
    }
  };

  // Xử lý khi nhấn thanh toán
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-3">Giỏ Hàng Của Bạn</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Giỏ hàng
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="alert alert-warning">
          Vui lòng{" "}
          <Link to="/login" className="alert-link">
            đăng nhập
          </Link>{" "}
          để xem giỏ hàng của bạn.
        </div>
      )}

      {isLoggedIn && loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2">Đang tải giỏ hàng...</p>
        </div>
      )}

      {isLoggedIn && !loading && cartItems.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h3>Giỏ hàng của bạn đang trống</h3>
          <p className="text-muted">
            Hãy tiếp tục mua sắm để thêm sản phẩm vào giỏ hàng
          </p>
          <Link to="/shop" className="btn btn-success mt-3">
            Tiếp tục mua sắm
          </Link>
        </div>
      )}

      {isLoggedIn && !loading && cartItems.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-hover border">
              <thead className="table-light">
                <tr>
                  <th className="text-center" style={{ width: "5%" }}>
                    #
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Ảnh
                  </th>
                  <th style={{ width: "30%" }}>Tên sản phẩm</th>
                  <th className="text-end" style={{ width: "15%" }}>
                    Đơn giá
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Số lượng
                  </th>
                  <th className="text-end" style={{ width: "15%" }}>
                    Thành tiền
                  </th>
                  <th className="text-center" style={{ width: "5%" }}>
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center align-middle">{index + 1}</td>
                    <td className="text-center">
                      <img
                        src={
                          item.Product?.images
                            ? `http://localhost:3000/images/${item.Product.images}`
                            : `http://localhost:3000/images/default.jpg`
                        }
                        alt={item.Product?.title || "Sản phẩm"}
                        className="img-thumbnail"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "http://localhost:3000/images/default.jpg";
                        }}
                      />
                    </td>
                    <td className="align-middle">
                      <Link
                        to={
                          item.Product?.id
                            ? `/productdetail/${item.Product.id}`
                            : "#"
                        }
                        className="text-decoration-none"
                      >
                        {item.Product?.title || "Sản phẩm không tồn tại"}
                      </Link>
                    </td>
                    <td className="text-end align-middle">
                      {parseInt(item.price).toLocaleString("vi-VN")} VNĐ
                    </td>
                    <td className="text-center align-middle">
                      <div
                        className="input-group"
                        style={{ maxWidth: "120px", margin: "0 auto" }}
                      >
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          min="1"
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end align-middle fw-bold">
                      {(parseFloat(item.price) * item.quantity).toLocaleString(
                        "vi-VN"
                      )}{" "}
                      VNĐ
                    </td>
                    <td className="text-center align-middle">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveItem(item.id)}
                        title="Xóa sản phẩm"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="table-light">
                  <td colSpan="5" className="text-end fw-bold">
                    Tổng tiền:
                  </td>
                  <td className="text-end fw-bold fs-5 text-danger">
                    {parseInt(totalPrice).toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <div>
              <Link to="/shop" className="btn btn-outline-success me-2">
                <i className="fas fa-arrow-left me-2"></i>
                Tiếp tục mua sắm
              </Link>
              <button
                className="btn btn-outline-danger"
                onClick={handleClearCart}
              >
                <i className="fas fa-trash me-2"></i>
                Xóa giỏ hàng
              </button>
            </div>
            <button className="btn btn-success" onClick={handleCheckout}>
              <i className="fas fa-check-circle me-2"></i>
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
