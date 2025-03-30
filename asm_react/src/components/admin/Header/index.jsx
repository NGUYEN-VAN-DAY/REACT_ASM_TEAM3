import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaUserShield, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        background: "linear-gradient(135deg, #007bff, #6610f2)",
        position: "relative", 
        width: "100%",
        padding: "10px 0",
      }}
    >
      <img
          src="/logo2.png"
          alt="Logo"
          className="position-absolute"
          style={{
            width: "60px",
            height: "60px",
            left: "30px",
            borderRadius: "50%",
            marginTop: "10px",
          }}
        />
      <div className="container position-relative">
        {/* Logo cách viền trái 30px */}
        

        {/* Tên thương hiệu căn giữa */}
        <Link className="navbar-brand fw-bold d-flex align-items-center mx-auto" to="/">
          <FaShoppingCart className="me-2" /> MyStore
        </Link>

        {/* Nút toggle khi thu nhỏ */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu điều hướng */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/admin/dashboard">
                <FaUserShield className="me-1" /> Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
