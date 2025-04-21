import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/users/login", formData);
      if (res.data.user) {
        // Lưu vào localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        setError(res.data.message || "Đăng nhập thất bại!");
      }
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center">Đăng Nhập</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control border-success"
              name="email"
              id="email"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              className="form-control border-success"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3 w-100">
            Đăng Nhập
          </button>
          <div className="text-center mt-3">
            <Link to="#" className="text-danger me-2">
              Quên mật khẩu?
            </Link>
            <Link to="/register" className="text-success">
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
//API /users/login không trả token, mà dùng session (req.session.user). Do đó:

// Nếu muốn bảo mật tốt hơn khi dùng API từ frontend, bạn nên dùng JWT (token) thay vì session.

// Nếu bạn vẫn dùng session, hãy chắc chắn bạn đã cấu hình CORS với credentials: true ở cả backend và frontend.