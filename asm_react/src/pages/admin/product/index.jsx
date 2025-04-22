import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";  // Import từ react-toastify

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/products/list");
      setProducts(response.data?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      setError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDelete = (id) => {
    // Hiển thị thông báo yêu cầu xác nhận xóa với 2 lựa chọn: Xóa và Hủy
    toast.warning(
      <div>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div className="d-flex justify-content-between">
          <button
            onClick={() => deleteProduct(id)}
            className="btn btn-danger btn-sm"
          >
            Xóa
          </button>
          <button
            onClick={() => toast.warning.dismiss()}  // Đóng toast khi người dùng chọn hủy
            className="btn btn-secondary btn-sm"
          >
            Hủy
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Không tự động đóng
        closeOnClick: false, // Không tự động đóng khi nhấn vào
        hideProgressBar: true, // Ẩn thanh tiến trình
        position: "top-center",  // Đặt vị trí toast ở trên cùng
      }
    );
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      toast.success("Xóa sản phẩm thành công"); // Thông báo xóa thành công

      // Đợi 2 giây rồi đóng thông báo yêu cầu xác nhận xóa
      setTimeout(() => {
        toast.dismiss();  // Đóng thông báo yêu cầu xác nhận xóa
      }, 1500);

    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm"); // Thông báo lỗi
      toast.dismiss();  // Đóng thông báo yêu cầu xác nhận xóa
    }
  };

  return (
    <div className="container-fluid px-4">
      <div className="card mb-4 mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Danh sách sản phẩm</h3>
          <Link to="/admin/products/add" className="btn btn-primary">
            <i className="fas fa-plus me-1"></i> Thêm sản phẩm
          </Link>
        </div>

        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {message.text && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "5%" }}>ID</th>
                    <th style={{ width: "20%" }}>Tên sản phẩm</th>
                    <th style={{ width: "10%" }}>Giá</th>
                    <th style={{ width: "15%" }}>Ảnh</th>
                    <th style={{ width: "10%" }}>Danh mục</th>
                    <th style={{ width: "10%" }}>Trạng thái</th>
                    <th style={{ width: "20%" }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <i className="fas fa-box-open me-2"></i>
                        Không có sản phẩm nào
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td className="align-middle">{product.id}</td>
                        <td
                          className="align-middle text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {product.title}
                        </td>
                        <td className="align-middle text-end">
                          {parseInt(product.price).toLocaleString("vi-VN")} đ
                        </td>
                        <td className="align-middle text-center">
                          <img
                            className="img-thumbnail"
                            width="80"
                            height="80"
                            style={{ objectFit: "cover" }}
                            src={product.imageUrl || ""}
                            alt={product.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                          />
                        </td>
                        <td className="align-middle text-center">
                          {product.category.name || "Chưa phân loại"}
                        </td>
                        <td className="align-middle text-center">
                          <span
                            className={`badge rounded-pill ${
                              product.status === 1
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {product.status === 1 ? "Hiển thị" : "Ẩn"}
                          </span>
                        </td>
                        <td className="align-middle text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="btn btn-warning btn-sm"
                            >
                              <i className="fas fa-edit me-1"></i> Sửa
                            </Link>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(product.id)}
                            >
                              <i className="fas fa-trash-alt me-1"></i> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Đảm bảo ToastContainer có mặt để hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default ListProduct;
