import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">404 - Không tìm thấy trang</h1>
      <p>Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Quay về Trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
