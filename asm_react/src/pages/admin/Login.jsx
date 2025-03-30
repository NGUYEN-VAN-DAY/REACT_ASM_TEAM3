import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true"); 
      navigate("/admin/dashboard"); 
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ backgroundColor: "#f8f9fa" , marginTop: "250px"}}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
        }}
      >
        <h3 className="text-center mb-4">Admin Login</h3>
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: "5px" }}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
