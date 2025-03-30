import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên Đăng Nhập</label>
            <input
              type="text"
              className="form-control border-success"
              name="name"
              id="name"
              placeholder="Nhập tên đăng nhập"
              value={formData.name}
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
          <button type="submit" className="btn btn-success btn-block mt-3 w-100">Đăng Nhập</button>
          <div className="text-center mt-3">
            <Link to="#" className="text-danger me-2">Quên mật khẩu?</Link>
            <Link to="/register" className="text-success">Đăng ký</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;