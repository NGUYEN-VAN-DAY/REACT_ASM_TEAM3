import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xác nhận mật khẩu
    if (form.password !== form.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        form,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Đăng ký thành công!");
        // Chuyển hướng đến trang đăng nhập sau 2 giây
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi đăng ký:", error);

      // Hiển thị thông báo lỗi từ server hoặc thông báo mặc định
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "450px" }}>
        <h2 className="text-center mb-4">Đăng Ký Tài Khoản</h2>
        <ToastContainer position="top-right" autoClose={3000} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ và Tên:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Số điện thoại:</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
              minLength="6"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nhập lại mật khẩu:</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>

        <p className="text-center mt-3">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-primary">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
