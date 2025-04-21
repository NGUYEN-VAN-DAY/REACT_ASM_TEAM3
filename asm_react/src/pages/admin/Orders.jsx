import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      setError('Có lỗi xảy ra khi tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/orders/${orderId}/status`,
        { status: newStatus }
      );
      fetchOrders(); // Refresh danh sách đơn hàng
    } catch (error) {
      setError('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    }
  };

  const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/orders/${orderId}/payment-status`,
        { payment_status: newPaymentStatus }
      );
      fetchOrders(); // Refresh danh sách đơn hàng
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quản Lý Đơn Hàng</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Trạng thái thanh toán</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                </td>
                <td>{order.user?.name || 'N/A'}</td>
                <td>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(parseInt(order.total_amount))}
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="completed">Đã giao hàng</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </td>
                <td>
                <select
                    className="form-select form-select-sm"
                    value={order.payment_status}
                    onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Chờ thanh toán</option>
                    <option value="completed">Đã thanh toán</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => window.location.href = `/admin/orders/${order.id}`}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders; 