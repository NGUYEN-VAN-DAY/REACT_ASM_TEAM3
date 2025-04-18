import { useForm } from "react-hook-form";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Constanst from "../../../Constanst";

const EditCate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchCategoryData = async () => {
    try {
      const res = await axios.get(`${Constanst.DOMAIN_API}/categories/${id}`);
      const category = res.data;
      console.log(category);

      setValue("name", category.name);
      setValue("description", category.description);
      setValue("status", String(category.status));

      if (category.image) {
        setPreviewImage(`${Constanst.DOMAIN_API}/uploads/${category.image}`);
      }
    } catch (error) {
      console.error("Lỗi lấy danh mục:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("status", data.status);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await axios.put(`${Constanst.DOMAIN_API}/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Cập nhật thành công!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi khi cập nhật danh mục!");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title">Chỉnh sửa Danh Mục</h3>
        <Link to="/admin/categories" className="btn btn-success">
          Quay về
        </Link>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="name">Tên Danh Mục</label>
            <input
              type="text"
              className="form-control"
              id="name"
              {...register("name", {
                required: "Tên danh mục không được để trống!",
              })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description">Mô Tả</label>
            <textarea
              className="form-control"
              rows={3}
              id="description"
              {...register("description", {
                required: "Mô tả không được để trống!",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="status">Trạng Thái</label>
            <select
              className="form-select"
              id="status"
              {...register("status", {
                required: "Trạng thái không được bỏ trống!",
              })}
            >
              <option value="1">Hiện</option>
              <option value="0">Ẩn</option>
            </select>
            {errors.status && (
              <p className="text-danger">{errors.status.message}</p>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="image">Ảnh</label>
            <input
              type="file"
              className="form-control"
              id="image"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" width="120" />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCate;