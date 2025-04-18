import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        toast.success("Xóa sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        toast.error("Có lỗi xảy ra khi xóa sản phẩm");
      }
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Danh sách sản phẩm</h3>
          <div className="card-tools">
            <Link
              to={"/admin/products/add"}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table
                id="example1"
                className="table table-bordered table-striped"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Giá KM</th>
                    <th>Ảnh</th>
                    <th>Danh mục</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Không có sản phẩm nào
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.title}</td>
                        <td>
                          {parseInt(product.price).toLocaleString("vi-VN")} đ
                        </td>
                        <td>
                          {parseInt(product.salePrice).toLocaleString("vi-VN")}{" "}
                          đ
                        </td>
                        <td>
                          <img
                            width={70}
                            src={`http://localhost:3000/images/${product.images}`}
                            alt={product.title}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "http://localhost:3000/images/default.jpg";
                            }}
                          />
                        </td>
                        <td>{product.category_id}</td>
                        <td>
                          <span
                            className={`badge ${
                              product.status === 1 ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {product.status === 1 ? "Hiển thị" : "Ẩn"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="btn btn-warning btn-sm mr-2"
                          >
                            Sửa
                          </Link>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Xóa
                          </button>
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
    </>
  );
};

export default ListProduct;
