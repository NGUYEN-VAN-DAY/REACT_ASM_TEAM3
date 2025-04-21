import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const calculateTotal = () => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/orders/create', {
        shipping_address: shippingAddress
      }, {
        withCredentials: true
      });

      if (response.data.message === 'Đặt hàng thành công') {
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderId: response.data.order.id,
            totalAmount: response.data.order.total_amount
          }
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };

  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thanh Toán</h2>
      
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Thông Tin Giao Hàng</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="shippingAddress" className="form-label">Địa Chỉ Giao Hàng</label>
                  <textarea
                    className="form-control"
                    id="shippingAddress"
                    rows="3"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <h5>Phương Thức Thanh Toán</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="cod"
                      value="cod"
                      checked
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="cod">
                      Thanh Toán Khi Nhận Hàng (COD)
                    </label>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Đang Xử Lý...' : 'Đặt Hàng'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Đơn Hàng Của Bạn</h5>
              {items.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>{item.price * item.quantity}đ</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Tổng Cộng:</strong>
                <strong>{calculateTotal()}đ</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 