import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Addproduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    salePrice: "",
    longDescription: "",
    status: 1,
    category_id: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/categories/list"
        );
        if (response.data && response.data.data) {
          setCategories(response.data.data);
          // Set default category_id to first category if available
          if (response.data.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              category_id: response.data.data[0].id,
            }));
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        setError("Không thể tải danh mục sản phẩm");
      }
    };

    fetchCategories();
  }, []);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      // Tạo URL preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Tạo form data để gửi lên server
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Thêm file ảnh nếu có
      if (productImage) {
        formDataToSend.append("productImage", productImage);
      }

      // Gửi request đến server
      const response = await axios.post(
        "http://localhost:3000/products/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Sản phẩm đã được thêm:", response.data);
      // Chuyển hướng về trang danh sách sản phẩm
      navigate("/admin/products");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      setError(
        error.response?.data?.error || "Đã xảy ra lỗi khi thêm sản phẩm"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Thêm sản phẩm</h4>
          <Link
            to={"/admin/products"}
            className="btn btn-primary btn-sm float-right"
          >
            <i className="fas fa-arrow-left"></i> Quay lại
          </Link>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="title">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="price">Giá gốc</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="salePrice">Giá khuyến mãi</label>
                  <input
                    type="number"
                    className="form-control"
                    id="salePrice"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Mô tả ngắn</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="2"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="longDescription">Mô tả chi tiết</label>
              <textarea
                className="form-control"
                id="longDescription"
                name="longDescription"
                rows="4"
                value={formData.longDescription}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="category_id">Danh mục</label>
              <select
                className="form-control"
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="status">Trạng thái</label>
              <select
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="1">Hiển thị</option>
                <option value="0">Ẩn</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="productImage">Ảnh sản phẩm</label>
              <input
                type="file"
                className="form-control"
                id="productImage"
                name="productImage"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <div className="mt-2">
                  <p>Xem trước:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px" }}
                  />
                </div>
              )}
            </div>

            <div className="text-end mb-3">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
