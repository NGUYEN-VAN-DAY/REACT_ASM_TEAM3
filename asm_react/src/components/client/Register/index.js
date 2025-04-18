import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Đăng Ký</h2>
        {submitted ? (
          <div className="alert alert-success text-center" role="alert">
            Đăng ký thành công! Hãy <Link to="/login">đăng nhập</Link>.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Họ và Tên:</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu:</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Nhập lại mật khẩu:</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="form-control" required />
            </div>
<<<<<<< HEAD
            <button type="submit" className="btn btn-success w-100">Đăng Ký</button>
=======
            <button type="submit" className="btn btn-primary w-100">Đăng Ký</button>
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
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
