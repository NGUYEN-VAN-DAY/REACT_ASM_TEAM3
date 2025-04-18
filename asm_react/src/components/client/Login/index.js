import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkServerSession } from "../../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Kiểm tra phiên đăng nhập từ server
  useEffect(() => {
    const verifySession = async () => {
      try {
        setCheckingSession(true);
        // Kiểm tra phiên đăng nhập với server
        const isValid = await checkServerSession();

        // Chỉ chuyển hướng nếu phiên đăng nhập hợp lệ
        if (isValid) {
          navigate("/");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra phiên đăng nhập:", error);
        // Nếu có lỗi, xóa dữ liệu người dùng trong localStorage
        localStorage.removeItem("user");
      } finally {
        setCheckingSession(false);
      }

      // Kiểm tra query param để hiển thị thông báo nếu có
      const urlParams = new URLSearchParams(location.search);
      const message = urlParams.get("message");
      if (message === "logout") {
        toast.success("Đăng xuất thành công!");
      } else if (message === "register") {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      }
    };

    verifySession();
  }, [navigate, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Xóa thông báo lỗi khi người dùng nhập lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Đang gửi yêu cầu đăng nhập...");
      toast.info("Đang xử lý đăng nhập...");

      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData,
        {
          withCredentials: true, // Quan trọng để gửi và nhận cookies
        }
      );

      console.log("Phản hồi từ server:", response.data);

      if (response.data.success) {
        // Lưu thông tin người dùng vào localStorage để dễ sử dụng ở client
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Đăng nhập thành công!");

        // Chuyển hướng người dùng về trang chủ sau 1 giây
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Lỗi đăng nhập chi tiết:", error);

      if (error.message === "Network Error") {
        setError(
          "Không thể kết nối tới server. Vui lòng kiểm tra kết nối mạng hoặc server đã được khởi động."
        );
        toast.error("Lỗi kết nối: Không thể kết nối tới server!");
      } else {
        const errorMessage =
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Hiển thị loading khi đang kiểm tra phiên
  if (checkingSession) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        <ToastContainer position="top-right" autoClose={3000} />

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email hoặc tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              placeholder="Nhập email hoặc tên đăng nhập"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>

          <div className="text-center">
            <Link to="/forgot-password" className="text-muted me-3">
              Quên mật khẩu?
            </Link>
            <Link to="/register" className="text-primary">
              Đăng ký tài khoản mới
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
