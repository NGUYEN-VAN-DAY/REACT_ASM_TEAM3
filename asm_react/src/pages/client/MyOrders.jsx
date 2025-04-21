import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders/my-orders', {
        withCredentials: true
      });
      setOrders(response.data);
    } catch (error) {
      setError('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning',
      processing: 'bg-info',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };

    const statusText = {
      pending: 'Chờ xác nhận',
      processing: 'Đang xử lý',
      completed: 'Đã hoàn thành',
      cancelled: 'Đã hủy'
    };

    return (
      <span className={`badge ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Đơn Hàng Của Tôi</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <p>Bạn chưa có đơn hàng nào.</p>
          <Link to="/" className="btn btn-primary">
            Mua Sắm Ngay
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-12 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Mã đơn hàng: #{order.id}</strong>
                    <br />
                    <small className="text-muted">
                      {formatDate(order.createdAt)}
                    </small>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      {order.OrderItems.map((item) => (
                        <div key={item.id} className="d-flex mb-2">
                          <img
                            src={"http://localhost:3000/images/"+ item.Product.images}
                            alt={item.Product.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="me-3"
                          />
                          <div>
                            <h6 className="mb-0">{item.Product.title}</h6>
                            <small>
                              Số lượng: {item.quantity} x {item.price}đ
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4">
                      <div className="text-end">
                        <h5>Tổng tiền: {order.total_amount}đ</h5>
                        <p className="mb-0">
                          <small>Địa chỉ giao hàng:</small>
                          <br />
                          {order.shipping_address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  {order.status === 'pending' && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={async () => {
                        try {
                          await axios.post(
                            `http://localhost:3000/orders/${order.id}/cancel`,
                            {},
                            { withCredentials: true }
                          );
                          fetchOrders();
                        } catch (error) {
                          alert('Không thể hủy đơn hàng');
                        }
                      }}
                    >
                      Hủy đơn hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders; 