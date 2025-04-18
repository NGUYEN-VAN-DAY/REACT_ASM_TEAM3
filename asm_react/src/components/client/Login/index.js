<<<<<<< HEAD
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
=======
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log("Form submitted", formData);
=======
    setSubmitted(true);
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
<<<<<<< HEAD
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
=======
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        {submitted ? (
          <div className="alert alert-success text-center" role="alert">
            Đăng nhập thành công!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu:</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
          </form>
        )}
        <p className="text-center mt-3">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
