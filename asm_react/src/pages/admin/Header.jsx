import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const DropdownMenu = ({ title, icon, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="nav-item">
      <button
        className="nav-link text-white btn w-100 text-start d-flex align-items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{icon} {title}</span>
        <span className="ms-auto">{isOpen ? "▼" : "▶"}</span>
      </button>
      {isOpen && (
        <ul className="list-unstyled ps-3">
          {links.map((link, index) => (
            <li key={index}>
              <Link className="nav-link text-white d-flex align-items-center" to={link.path}>
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Header = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3 position-fixed" style={{ width: "250px" }}>
      <h4 className="text-center py-3 border-bottom">Admin Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/admin/dashboard">
            🏠 <span className="ms-2">Dashboard</span>
          </Link>
        </li>

        <DropdownMenu
          title="Danh Mục"
          icon="📂"
          links={[
            { path: "/admin/categories", label: "Xem Danh Mục", icon: "📜" },
            { path: "/admin/categories/add", label: "Thêm Danh Mục", icon: "➕" },
          ]}
        />

        <DropdownMenu
          title="Sản Phẩm"
          icon="🛒"
          links={[
            { path: "/admin/products", label: "Xem Sản Phẩm", icon: "📦" },
            { path: "/admin/products/add", label: "Thêm Sản Phẩm", icon: "➕" },
          ]}
        />

        

        <DropdownMenu
          title="Đơn Hàng"
          icon="📦"
          links={[
            { path: "/admin/orders", label: "Xem Đơn Hàng", icon: "📜" },
          ]}
        />

        <DropdownMenu
          title="Người Dùng"
          icon="👤"
          links={[
            { path: "/admin/users", label: "Xem Người Dùng", icon: "📜" },
            { path: "/admin/users/add", label: "Thêm Người Dùng", icon: "➕" },
          ]}
        />

        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" to="/admin/login">
            🔑 <span className="ms-2">Đăng Nhập</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white d-flex align-items-center" >
          🚪 <span className="ms-2">Đăng Xuất</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
