import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Addproduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      salePrice: "",
      longDescription: "",
      status: "1",
      category_id: "",
    },
  });

  // Fetch danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories/list");
        if (response.data?.data) {
          setCategories(response.data.data);
          if (response.data.data.length > 0) {
            setValue("category_id", response.data.data[0].id);
          }
        }
      } catch (error) {
        setError("Không thể tải danh mục sản phẩm");
      }
    };
    fetchCategories();
  }, [setValue]);

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit
  const onSubmit = async (data) => {
    setError("");

    try {
      const formDataToSend = new FormData();
      for (let key in data) {
        formDataToSend.append(key, data[key]);
      }

      if (productImage) {
        formDataToSend.append("productImage", productImage);
      }

      const res = await axios.post("http://localhost:3000/products/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Sản phẩm đã được thêm:", res.data);
      navigate("/admin/products");
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      setError(err.response?.data?.error || "Đã xảy ra lỗi khi thêm sản phẩm");
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Thêm sản phẩm</h4>
        <Link to={"/admin/products"} className="btn btn-primary btn-sm float-right">
          <i className="fas fa-arrow-left"></i> Quay lại
        </Link>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="title">Tên sản phẩm</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              {...register("title", { required: "Tên sản phẩm là bắt buộc" })}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Giá gốc</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  {...register("price", {
                    required: "Giá gốc là bắt buộc",
                    min: { value: 0, message: "Giá phải lớn hơn hoặc bằng 0" },
                  })}
                />
                {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label>Giá khuyến mãi</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("salePrice")}
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Mô tả ngắn</label>
            <textarea
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              rows="2"
              {...register("description", { required: "Mô tả là bắt buộc" })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Mô tả chi tiết</label>
            <textarea
              className="form-control"
              rows="4"
              {...register("longDescription")}
            />
          </div>

          <div className="form-group mb-3">
            <label>Danh mục</label>
            <select
              className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
              {...register("category_id", { required: "Vui lòng chọn danh mục" })}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category_id && <div className="invalid-feedback">{errors.category_id.message}</div>}
          </div>

          <div className="form-group mb-3">
            <label>Trạng thái</label>
            <select className="form-control" {...register("status")}>
              <option value="1">Hiển thị</option>
              <option value="0">Ẩn</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label>Ảnh sản phẩm</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
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

          <div className="text-end">
            <button className="btn btn-success" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang xử lý..." : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
