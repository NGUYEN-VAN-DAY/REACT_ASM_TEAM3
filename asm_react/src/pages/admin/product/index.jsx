import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  // Lấy danh sách sản phẩm khi component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hàm lấy danh sách sản phẩm
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/products/list");
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      setError("Không thể tải danh sách sản phẩm");
      setLoading(false);
    }
  };

  // Hàm xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        // Cập nhật lại danh sách sản phẩm sau khi xóa
        setProducts(products.filter((product) => product.id !== id));
        setMessage({ text: "Xóa sản phẩm thành công", type: "success" });

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setMessage({ text: "", type: "" });
        }, 3000);
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        setMessage({ text: "Có lỗi xảy ra khi xóa sản phẩm", type: "danger" });

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
          setMessage({ text: "", type: "" });
        }, 3000);
      }
    }
  };

    return (
    <div className="container-fluid px-4">
      <div className="card mb-4 mt-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Danh sách sản phẩm</h3>
          <Link to={"/admin/products/add"} className="btn btn-primary">
            <i className="fas fa-plus me-1"></i> Thêm sản phẩm
                        </Link>
                    </div>
                    <div className="card-body">
          {/* Hiển thị thông báo lỗi hoặc thành công */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {message.text && (
            <div className={`alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}

          {/* Hiển thị loading spinner */}
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
                            src={
                              product.imageUrl ||
                              `http://localhost:3000/images/default.jpg`
                            }
                            alt={product.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "http://localhost:3000/images/default.jpg";
                            }}
                          />
                                    </td>
                        <td className="align-middle text-center">
                          {product.category_id}
                                    </td>
                        <td className="align-middle text-center">
                          <span
                            className={`badge rounded-pill ${
                              product.status === 1 ? "bg-success" : "bg-danger"
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
                              title="Sửa sản phẩm"
                            >
                              <i className="fas fa-edit me-1"></i> Sửa
                            </Link>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              title="Xóa sản phẩm"
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
            </div>
  );
};

    export default ListProduct;
