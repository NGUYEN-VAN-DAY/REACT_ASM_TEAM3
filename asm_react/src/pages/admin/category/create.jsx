import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import Constanst from "../../../Constanst";

const AddCategory = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleAdd = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("status", data.status);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);

      const res = await axios.post(
        `${Constanst.DOMAIN_API}/categories/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Thêm thành công:", res.data);
      navigate("/admin/categories");
    } catch (error) {
      console.error(
        "Lỗi khi thêm danh mục:",
        error.response?.data || error.message
      );
      alert("Lỗi khi thêm danh mục! " + (error.response?.data?.error || ""));
    }
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title">Thêm Mới Danh Mục</h3>
        <Link to="/admin/categories" className="btn btn-success">
          Quay về
        </Link>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(handleAdd)}>
          {/* Tên danh mục */}
          <div className="form-group mb-3">
            <label htmlFor="name">Tên Danh Mục</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tên danh mục"
              {...register("name", {
                required: "Tên danh mục không được để trống!",
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          {/* Ảnh - Input file */}
          <div className="form-group mb-3">
            <label htmlFor="image">Ảnh</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("image", {
                required: "Vui lòng chọn một ảnh!",
              })}
            />
            {errors.image && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>

          {/* Trạng thái */}
          <div className="form-group mb-3">
            <label htmlFor="status">Trạng thái:</label>
            <select
              className="form-select"
              {...register("status", {
                required: "Trạng thái không được bỏ trống!",
              })}
            >
              <option value="">-- Chọn --</option>
              <option value="0">Ẩn</option>
              <option value="1">Hiện</option>
            </select>
            {errors.status && (
              <p className="text-danger">{errors.status.message}</p>
            )}
          </div>

          {/* Mô tả */}
          <div className="form-group mb-3">
            <label htmlFor="description">Mô Tả</label>
            <textarea
              className="form-control"
              rows={3}
              {...register("description", {
                required: "Mô tả không được bỏ trống!",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          {/* Nút submit */}
          <button type="submit" className="btn btn-primary">
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
