import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      setError('Có lỗi xảy ra khi tải chi tiết đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/orders/${orderId}/status`,
        { status: newStatus }
      );
      fetchOrderDetail(); // Refresh chi tiết đơn hàng
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    }
  };

  const handlePaymentStatusChange = async (newPaymentStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/orders/${orderId}/payment-status`,
        { payment_status: newPaymentStatus }
      );
      fetchOrderDetail(); // Refresh chi tiết đơn hàng
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật trạng thái thanh toán');
    }
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

  if (!order) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Chi Tiết Đơn Hàng #{order.id}</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông Tin Đơn Hàng</h5>
            </div>
            <div className="card-body">
              <p><strong>Ngày đặt:</strong> {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
              <p><strong>Trạng thái:</strong>
                <select
                  className="form-select d-inline-block w-auto ms-2"
                  value={order.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="completed">Đã giao hàng</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </p>
              <p><strong>Phương thức thanh toán:</strong> {order.payment_method}</p>
              <p><strong>Trạng thái thanh toán:</strong>
                <select
                  className="form-select d-inline-block w-auto ms-2"
                  value={order.payment_status}
                  onChange={(e) => handlePaymentStatusChange(e.target.value)}
                >
                  <option value="pending">Chờ thanh toán</option>
                  <option value="completed">Đã thanh toán</option>
                </select>
              </p>

              <p><strong>Tổng tiền:</strong> {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(parseInt(order.total_amount))}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Thông Tin Khách Hàng</h5>
            </div>
            <div className="card-body">
              <p><strong>Email:</strong> {order.user?.email || 'N/A'}</p>
              <p><strong>Địa chỉ giao hàng:</strong> {order.shipping_address}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Sản Phẩm</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.OrderItems?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={'http://localhost:3000/images/' + item.Product?.images}
                              alt={item.Product?.title}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="me-3"
                            />
                            <div>
                              <h6 className="mb-0">{item.Product?.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 