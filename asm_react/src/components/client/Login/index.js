import { useState } from "react";


const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
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
      </div>
    </div>
  );
};

export default Login;