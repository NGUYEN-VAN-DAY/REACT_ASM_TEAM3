import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "Tên phải có ít nhất 3 ký tự.";
    }

    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (response.data.status) {
        setSubmitted(true);
      } else {
        setErrors({ general: response.data.message || "Đăng ký thất bại!" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Đã xảy ra lỗi khi kết nối với máy chủ!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h2 className="text-center mb-4">Đăng Ký</h2>

        {submitted ? (
          <div className="alert alert-success text-center">
            Đăng ký thành công! Hãy <Link to="/login">đăng nhập</Link>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {errors.general && <div className="alert alert-danger text-center">{errors.general}</div>}

            <div className="mb-3">
              <label className="form-label">Họ và Tên:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu:</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Nhập lại mật khẩu:</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? "Đang Đăng Ký..." : "Đăng Ký"}
            </button>
          </form>
        )}
        <p className="text-center mt-3">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
