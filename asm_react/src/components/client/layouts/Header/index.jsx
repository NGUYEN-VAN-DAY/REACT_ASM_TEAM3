import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../../public/assets/images/logo2.png";

const Header = () => {
  const [user, setUser] = useState(null);

  // Lấy user từ localStorage nếu có
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; // Chuyển hướng về trang login
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <img src={logo} alt="Logo" id="logo" />
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link to="/home" className="active">Trang chủ</Link></li>
            <li className="dropdown">
              <Link to="/about">
                <span>Giới thiệu</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
              </Link>
              <ul>{/* Add dropdown items here */}</ul>
            </li>
            <li><Link to="/shop">Cửa hàng</Link></li>
            <li><Link to="/maintenance">Bảo dưỡng</Link></li>
            <li><Link to="/blog">Sự kiện</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            <li><Link to="/card">Giỏ hàng</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <div className="header-social-links">
          <div className="dropdown">
            <Link
              to="#"
              id="dropdownLoginButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                width="40px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8sX0HxMS0QXhV_KXs5bLFbrRxj8ga2dmcIA&s"
                alt="User"
              />
            </Link>
            <div className="dropdown-menu p-4" style={{ width: "300px" }}>
              {user ? (
                <>
                  <h3>
                    Xin chào, <span className="fs-3">{user.name}!</span>
                  </h3>
                  <button
                    className="btn btn-danger text-white w-100 mt-3"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <h3>Chào mừng bạn đến với website!</h3>
                  <Link to="/login" className="btn btn-success text-white w-100 mt-3">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn btn-outline-primary w-100 mt-2">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
