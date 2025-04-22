import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, loading, updateQuantity, removeFromCart, getCartTotal, formatCurrency, fetchCart } = useCart();
  const [error, setError] = useState('');

  // Kiểm tra cartItems có phải là mảng không
  const items = Array.isArray(cartItems) ? cartItems : [];

  // Fetch dữ liệu giỏ hàng khi component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const success = await updateQuantity(productId, newQuantity);
      if (!success) {
        setError('Không thể cập nhật số lượng sản phẩm');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật giỏ hàng');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const success = await removeFromCart(productId);
      if (!success) {
        setError('Không thể xóa sản phẩm khỏi giỏ hàng');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      setError('Giỏ hàng trống, vui lòng thêm sản phẩm');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Giỏ Hàng</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-5">
          <h4>Giỏ hàng trống</h4>
          <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
          <Link to="/shop" className="btn btn-primary mt-3">
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={'http://localhost:3000/images/' + item.images}
                                alt={item.title}
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                className="me-3"
                              />
                              <div>
                                <h6 className="mb-0">{item.title}</h6>
                              </div>
                            </div>
                          </td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>
                            <div className="input-group" style={{ width: '120px' }}>
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="form-control text-center"
                                value={item.quantity}
                                readOnly
                              />
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>{formatCurrency(item.totalPrice)}</td>  
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Tổng Đơn Hàng</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(getCartTotal())}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Tổng cộng:</strong>
                  <strong>{formatCurrency(getCartTotal())}</strong>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handleCheckout}
                >
                  Thanh Toán
                </button>
                <Link to="/shop" className="btn btn-outline-secondary w-100 mt-2">
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 