import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};

  return (
    <div className="container mt-5">
      <div className="text-center">
        <FaCheckCircle className="text-success" style={{ fontSize: '4rem' }} />
        <h2 className="mt-3">Đặt Hàng Thành Công!</h2>
        <p className="lead">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
        </p>
        
        <div className="card mx-auto mt-4" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <h5 className="card-title">Thông Tin Đơn Hàng</h5>
            <p className="card-text">
              Mã đơn hàng: <strong>{orderId}</strong>
            </p>
            <p className="card-text">
              Tổng tiền: <strong>{totalAmount}đ</strong>
            </p>
            <p className="card-text">
              Phương thức thanh toán: <strong>Thanh toán khi nhận hàng (COD)</strong>
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p>
            Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </p>
          <p>
            Bạn có thể theo dõi trạng thái đơn hàng trong phần "Đơn hàng của tôi".
          </p>
        </div>

        <div className="mt-4">
          <Link to="/my-orders" className="btn btn-primary me-2">
            Xem Đơn Hàng
          </Link>
          <Link to="/" className="btn btn-outline-primary">
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 